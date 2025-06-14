import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SiteFormData } from "@/schemas/site.schema";
import { generateSiteName, generateMenuItems, generateSiteData } from "@/lib/actions/siteGenerator.actions";
import { generateEnvironment } from "@/lib/actions/environmentGenerator.actions";
import { EnvironmentInterface } from "@/interfaces/environment.interface";

type GeneratorContext = {
  siteType: SiteFormData["type"];
  terrain: string[];
  climate: string;
  tags: string[];
};

type UseSiteGeneratorActionsReturn = {
  name: () => void;
  menu: () => void;
  all: () => void;
  reroll: () => void;
};

export function useSiteGeneratorActions(
  methods: UseFormReturn<SiteFormData>,
  context: GeneratorContext,
  isWilderness: boolean,
  settlementId?: string
): UseSiteGeneratorActionsReturn {
  const { siteType, climate, terrain, tags } = context;

  const { getValues, setValue } = methods;

  // Store generated env in ref-like state to prevent duplicate calls
  const [cachedEnv, setCachedEnv] = useState<{
    terrain: string[];
    climate: string;
    tags: string[];
  } | null>(null);


  const getShopType = useCallback(() => {
    return getValues("shopType");
  }, [methods]);


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


  const generateMenu = useCallback(async (env?: EnvironmentInterface) => {
    const effectiveEnv = env || await regenerateEnvironment();
    if (!siteType) return;

    const shopType = getShopType();

    const menuItems = await generateMenuItems({
      siteType: [siteType],
      shopType,
      settlementTerrain: effectiveEnv.terrain,
      settlementClimate: effectiveEnv.climate,
      settlementTags: effectiveEnv.tags,
    });

    const cleanedItems = menuItems.map((item) => ({
      name: item.name || "",
      price: String(item.price || ""),
      category: item.category || undefined,
      description: item.description || undefined,
    }));

    methods.setValue("menu", cleanedItems);
  }, [siteType, methods, getShopType, regenerateEnvironment]);


  const generateAll = useCallback(async () => {
    if (!siteType) return;

    const env = await regenerateEnvironment(false);
    const currentValues = methods.getValues();
    const overrides = { ...currentValues };


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

    Object.entries(result).forEach(([key, value]) => {
      const currentValue = methods.getValues(key as keyof SiteFormData);

      const isEmpty = currentValue === undefined || currentValue === null || currentValue === "" ||
        (Array.isArray(currentValue) && currentValue.length === 0);

      if (isEmpty && value !== undefined && value !== null && value !== "") {
        methods.setValue(key as keyof SiteFormData, value);
      }
    });

    await generateMenu(env);
  }, [siteType, methods, generateMenu, regenerateEnvironment]);



  const rerollAll = useCallback(async () => {
    if (!siteType) return;

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

    Object.entries(result).forEach(([key, value]) => {
      methods.setValue(key as keyof SiteFormData, value);
    });

    await generateMenu(env);
  }, [siteType, methods, getShopType, generateMenu, regenerateEnvironment]);


  return {
    name: generateName,
    menu: generateMenu,
    all: generateAll,
    reroll: rerollAll,
  };
}