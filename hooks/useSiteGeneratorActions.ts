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
import { generateSiteName, generateSiteData, generateMenuData, fetchMenuItem } from "@/lib/actions/siteGenerator.actions";
import { generateEnvironment } from "@/lib/actions/environmentGenerator.actions";

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
  menu: () => void;
  menuItem: (index: number) => void;
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

    const name = await generateSiteName({
      siteType: [siteType],
      shopType,
      terrain: env.terrain,
      climate: env.climate,
      tags: env.tags,
    });

    methods.setValue("name", name);
  }, [siteType, methods, getShopType, regenerateEnvironment]);


  /**
   * Generates menu items for the site.
   * Uses passed-in factors to influence menu generation.
   * Cleans the menu items and sets them in the form under 'menu'.
  */

  const generateMenu = useCallback(async () => {
    if (!siteType) return;
        
    setValue("menu", []); // clearing out menu to prevent shopType changing causing errors with categories

    const shopType = getShopType();
    const formData = methods.getValues();
    const siteSize = formData.size;
    const siteCondition = formData.condition;

    const menuItems = await generateMenuData(
      {
        siteType,
        shopType,
        climate: context.climate,
        terrain: context.terrain,
        tags: context.tags,
        magic,
        wealth,
        siteSize,
        siteCondition
      }, 
      formData
    );

    // Clean menu items to ensure form compatibility (strings & optional fields)
    const cleanedItems = menuItems.map((item) => ({
      name: item.name || "",
      price: String(item.price || ""),
      category: item.category || undefined,
      description: item.description || undefined,
      quality: item.quality || undefined,
      quantity: item.quantity || "",
      rarity: item.rarity || undefined,
    }));

    methods.setValue("menu", cleanedItems);
  }, [siteType, methods, getShopType, regenerateEnvironment]);


  /**
   * Generates a new single menu item asynchronously and replaces the item
   * at the specified index in the form's menu array.
   *
   * @param {number} index - The position in the menu array to replace with the new item.
   */

  const generateMenuItem = useCallback(
    async (index: number) => {
       // If the siteType is not defined, exit early — can't generate without a site type.
      if (!siteType) return;

      // Retrieve the current shopType from the form, if applicable.
      const shopType = getShopType();

      const formData = methods.getValues();
      const siteSize = formData.size;
      const siteCondition = formData.condition;

      // Call the server action fetchMenuItem to get one new menu item matching the current context.
      // Passes siteType, shopType, environment, and other relevant factors.
      const items = await fetchMenuItem({
        siteType,
        shopType,
        climate: context.climate,
        terrain: context.terrain,
        tags: context.tags,
        magic,
        wealth,
        siteCondition,
        siteSize
      });

      if (!Array.isArray(items) || items.length === 0) return;

      // Take the first item from the returned array — it should contain exactly one item.
      const newItem = items[0];

      // Clean up the item fields for the form:
      // - Ensure name and price are strings
      // - Use undefined for optional fields if they're missing
      const cleanedItem = {
        name: newItem.name || "",
        price: String(newItem.price || ""),
        category: newItem.category || undefined,
        description: newItem.description || undefined,
        quality: newItem.quality || undefined,
        quantity: newItem.quantity || "",
        rarity: newItem.rarity || undefined,
      };

      // Get the current 'menu' array from the form & replace item at specified index
      const currentMenu = methods.getValues("menu") || [];
      currentMenu[index] = cleanedItem;
      methods.setValue("menu", currentMenu);
    }, [siteType, methods, getShopType, context]
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

    // Generate the menu based on updated environment
    await generateMenu();
  }, [siteType, methods, generateMenu, regenerateEnvironment]);


  /**
   * Force rerolls all site data, ignoring current form values.
   * Also regenerates the environment forcibly.
   * Updates all form fields and regenerates the menu.
  */

  const rerollAll = useCallback(async () => {
    if (!siteType) return;
    
    setValue("menu", []); // clearing out menu to prevent shopType changing causing errors with categories

    const env = await regenerateEnvironment(true);
    const shopType = getShopType();


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

    // Regenerate the menu with the new environment
    await generateMenu();
  }, [siteType, methods, getShopType, generateMenu, regenerateEnvironment]);


  // Return the four main generation actions
  return {
    name: generateName,
    menu: generateMenu,
    menuItem: generateMenuItem,
    all: generateAll,
    reroll: rerollAll,
  };
}