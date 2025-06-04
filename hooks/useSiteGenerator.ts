import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SiteFormData } from "@/schemas/site.schema";
import { generateSiteName, generateMenuItems } from "@/lib/actions/siteGenerator.actions";
import { generateSiteValues } from "@/lib/modules/sites/siteRules";
import { generateEnvironment } from "@/lib/actions/environmentGenerator.actions";

type GeneratorContext = {
  siteType: SiteFormData["type"];
  terrain: string[];
  climate: string;
  tags: string[];
};

type UseSiteGeneratorReturn = {
  name: () => void;
  menu: () => void;
  all: () => void;
  reroll: () => void;
};

export function useSiteGenerator(
  methods: UseFormReturn<SiteFormData>,
  context: GeneratorContext,
  isWilderness: boolean
): UseSiteGeneratorReturn {
  const { siteType, climate, terrain, tags } = context;

  // Store generated env in ref-like state to prevent duplicate calls
  const [cachedEnv, setCachedEnv] = useState<{
    terrain: string[];
    climate: string;
    tags: string[];
  } | null>(null);

  const getShopType = useCallback(() => {
    return methods.getValues("shopType");
  }, [methods]);

  const regenerateEnvironment = useCallback(
    async (force = false) => {
      if (!isWilderness) {
        return { terrain, climate, tags };
      }

      const isEmptyOrRandom =
        force ||
        !climate || climate === "random" ||
        !terrain?.length || terrain.includes("random") ||
        !tags?.length || tags.includes("random");

      if (!isEmptyOrRandom && cachedEnv) {
        return cachedEnv;
      }

      const newEnv = await generateEnvironment({ climate, terrain, tags });

      methods.setValue("climate", newEnv.climate);
      methods.setValue("terrain", newEnv.terrain);
      methods.setValue("tags", newEnv.tags);

      setCachedEnv(newEnv);

      return newEnv;
    },
    [climate, terrain, tags, isWilderness, cachedEnv, methods]
  );

  const generateName = useCallback(async () => {
    if (!siteType) return;

    const env = await regenerateEnvironment();
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

  const generateMenu = useCallback(async () => {
    if (!siteType) return;

    const env = await regenerateEnvironment();
    const shopType = getShopType();

    const menuItems = await generateMenuItems({
      siteType: [siteType],
      shopType,
      settlementTerrain: env.terrain,
      settlementClimate: env.climate,
      settlementTags: env.tags,
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

    const env = await regenerateEnvironment();
    const shopType = getShopType();

    const result = await generateSiteValues(siteType, {
      terrain: env.terrain,
      climate: env.climate,
      tags: env.tags,
      name: methods.getValues("name"),
      size: methods.getValues("size"),
      condition: methods.getValues("condition"),
      shopType,
    });

    Object.entries(result).forEach(([key, value]) => {
      methods.setValue(key as keyof SiteFormData, value);
    });

    await generateMenu();
  }, [siteType, methods, getShopType, generateMenu, regenerateEnvironment]);

  const rerollAll = useCallback(async () => {
    if (!siteType) return;

    const env = await regenerateEnvironment(false);
    const shopType = getShopType();

    const result = await generateSiteValues(siteType, {
      terrain: env.terrain,
      climate: env.climate,
      tags: env.tags,
      shopType,
    });

    Object.entries(result).forEach(([key, value]) => {
      methods.setValue(key as keyof SiteFormData, value);
    });

    await generateMenu();
  }, [siteType, methods, getShopType, generateMenu, regenerateEnvironment]);

  return {
    name: generateName,
    menu: generateMenu,
    all: generateAll,
    reroll: rerollAll,
  };
}