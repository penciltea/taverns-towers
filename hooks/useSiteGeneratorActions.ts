/**
 * Hook: useSiteGeneratorActions
 *
 * Provides reusable async generator actions for site form data:
 * - generateName: generates site name based on environment & type
 * - generateMenu: generates menu items considering environment and site context
 * - generateAll: generates all site data with partial preservation of existing fields
 * - rerollAll: forces complete regeneration of site data and menu
 *
 * Supports wilderness mode with dynamic environment regeneration.
 */


import { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SiteFormData } from "@/schemas/site.schema";
import { generateSiteName, generateSiteData, generateMenuData } from "@/lib/actions/siteGenerator.actions";
import { generateEnvironment } from "@/lib/actions/environmentGenerator.actions";
import { siteTypeHasMenu } from "@/lib/util/siteHelpers";

type GeneratorContext = {
  siteType: SiteFormData["type"];
  terrain: string[];
  climate: string;
  tags: string[];
  magic: string;
  wealth: string;
};

type UseSiteGeneratorActionsReturn = {
  name: () => void;
  menuItems: (index?: number) => void;
  all: () => void;
  reroll: () => void;
};

export function useSiteGeneratorActions(
  methods: UseFormReturn<SiteFormData>,
  context: GeneratorContext,
  isWilderness: boolean,
  settlementId?: string
): UseSiteGeneratorActionsReturn {
  const { siteType, climate, terrain, tags, magic, wealth } = context;

  const { getValues, setValue } = methods;

  // Cached environment stored locally to avoid duplicate generation calls
  const [cachedEnv, setCachedEnv] = useState<{
    terrain: string[];
    climate: string;
    tags: string[];
  } | null>(null);

  // Helper to get the current shopType field value from the form
  const getShopType = useCallback(() => {
    return getValues("shopType");
  }, [methods]);

  // Helper to get the current guildType field value from the form
  const getGuildType = useCallback(() => {
    return getValues("guildType");
  }, [methods]);


  /**
   * Regenerate environment context if wilderness or forced.
   * @return current context if non-wilderness.
   * Caches generated environment to avoid repeated calls.
   */

  const regenerateEnvironment = useCallback(
    async (force = false) => {
      if (!isWilderness) {
        // No regeneration for non-wilderness, just return current context
        return { terrain, climate, tags };
      }

      // Check if the current environment fields are considered "empty" or "random"
      const isEmptyOrRandom =
        force ||
        !climate || climate === "random" ||
        !terrain?.length || terrain.includes("random") ||
        !tags?.length || tags.includes("random");

      // If environment is valid (not empty/random) and we have cachedEnv, just return it
      if (!isEmptyOrRandom && cachedEnv) {
        return cachedEnv;
      }

      // Otherwise, generate a new environment
      const newEnv = await generateEnvironment({ climate, terrain, tags }, force);

      // Only update form fields if force=true or current values are empty/random
      if (force || isEmptyOrRandom) {
        setValue("climate", newEnv.climate);
        setValue("terrain", newEnv.terrain);
        setValue("tags", newEnv.tags);
        setCachedEnv(newEnv);
      }

      return newEnv;
    },
    [climate, terrain, tags, isWilderness, cachedEnv, methods]
  );

  /**
   * Generates a site name based on siteType, shopType, and environment.
   * Sets the 'name' field in the form.
   */

  const generateName = useCallback(async () => {
    if (!siteType) return;
    

    const env = await regenerateEnvironment(false);
    const shopType = getShopType();
    const guildType = getGuildType();

    const name = await generateSiteName({
      siteType: [siteType],
      shopType: siteType === "shop" ? shopType : undefined,
      guildType: siteType === "guild" ? guildType : undefined,
      terrain: env.terrain,
      climate: env.climate,
      tags: env.tags,
    });

    methods.setValue("name", name);
  }, [siteType, methods, getShopType, getGuildType, regenerateEnvironment]);

  /** 
   * Generates menu items for the site
   * @param { number } index - position in the menu array to replace a new menu item with (optional)
   */

  const generateMenuItems = useCallback(
    async (index?: number) => {
      if (!siteType) return;

      const shopType = getShopType();
      const guildType = getGuildType();
      const formData = methods.getValues();
      const siteSize = formData.size;
      const siteCondition = formData.condition;

      const generationContext = {
        siteType,
        shopType: siteType === "shop" ? shopType : undefined,
        guildType: siteType === "guild" ? guildType : undefined,
        climate: context.climate,
        terrain: context.terrain,
        tags: context.tags,
        magic,
        wealth,
        siteSize,
        siteCondition
      };

      // Clear the full menu before regenerating all items
      if (typeof index !== "number") {
        methods.resetField("menu", { defaultValue: [] });
      }
      
      let singleItem = false; // For fetching data
      if(typeof index === "number"){
        singleItem = true;
      }
      
      let items = await generateMenuData({...generationContext, singleItem: singleItem});

      if (!Array.isArray(items) || items.length === 0) return;

      const cleanedItems = items.map((item) => ({
        name: item.name || "",
        price: String(item.price || ""),
        category: item.category || undefined,
        description: item.description || undefined,
        quality: item.quality || undefined,
        quantity: item.quantity || "",
        rarity: item.rarity || undefined,
      }));

      if (typeof index === "number") {
        const currentMenu = methods.getValues("menu") || [];
        currentMenu[index] = cleanedItems[0]; // assumes fetchMenuItem returns a single-item array
        methods.setValue("menu", currentMenu);
      } else {
        methods.setValue("menu", cleanedItems);
      }
    },
    [siteType, methods, getShopType, getGuildType, context, magic, wealth, setValue]
  );


  /**
   * Generates all site data except for fields already set.
   * Preserves existing form values where present.
   * After generation, also generates the menu.
  */

  const generateAll = useCallback(async () => {
    if (!siteType) return;

    const env = await regenerateEnvironment(false);
    const currentValues = methods.getValues();
    const overrides = { ...currentValues };

    // Generate site data based on whether wilderness or settlement context
    const result = await generateSiteData(
      siteType,
      isWilderness
        ? {
            terrain: env.terrain,
            climate: env.climate,
            tags: env.tags,
            overrides,
          }
        : {
            settlementId,
            overrides,
          },
      false
    );

    // Only update fields that are empty or missing in the current form
    Object.entries(result).forEach(([key, value]) => {
      const currentValue = methods.getValues(key as keyof SiteFormData);

      const isEmpty = currentValue === undefined || currentValue === null || currentValue === "" ||
        (Array.isArray(currentValue) && currentValue.length === 0);

      if (isEmpty && value !== undefined && value !== null && value !== "") {
        methods.setValue(key as keyof SiteFormData, value);
      }
    });

    // Check if site type has menu
    // If so, regenerate the menu with the new environment
    if (siteTypeHasMenu(siteType)) {
      await generateMenuItems();
    }
  }, [siteType, methods, generateMenuItems, regenerateEnvironment]);


  /**
   * Force rerolls all site data, ignoring current form values.
   * Also regenerates the environment forcibly.
   * Updates all form fields and regenerates the menu.
  */

  const rerollAll = useCallback(async () => {
    if (!siteType) return;
    
    setValue("menu", []); // clearing out menu to prevent shopType/guildType changing causing errors with categories

    const env = await regenerateEnvironment(true);
    const emptyOverrides: Partial<SiteFormData> = {};

    const result = await generateSiteData(
      siteType,
      isWilderness
        ? {
            terrain: env.terrain,
            climate: env.climate,
            tags: env.tags,
            overrides: emptyOverrides
          }
        : {
            settlementId,
            overrides: emptyOverrides
          },
      true // rerollAll
    );

    // Set all generated fields directly, replacing current values
    Object.entries(result).forEach(([key, value]) => {
      methods.setValue(key as keyof SiteFormData, value);
    });

    // Check if site type has menu
    // If so, regenerate the menu with the new environment
    if (siteTypeHasMenu(siteType)) {
      await generateMenuItems();
    }
  }, [siteType, methods, generateMenuItems, regenerateEnvironment]);


  // Return the four main generation actions
  return {
    name: generateName,
    menuItems: generateMenuItems,
    all: generateAll,
    reroll: rerollAll,
  };
}