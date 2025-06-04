import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SiteFormData } from "@/schemas/site.schema";
import { generateSiteName, generateMenuItems } from "@/lib/actions/siteGenerator.actions";
import { generateSiteValues } from "@/lib/modules/sites/siteRules";
import { useEnvironmentContext } from "./useEnvironmentContext";

type GeneratorContext = {
  siteType: SiteFormData["type"];
  terrain: string[];
  climate: string;
  tags: string[];
};

export function useSiteGenerator(
  methods: UseFormReturn<SiteFormData>,
  context: GeneratorContext
) {
  const { siteType, terrain, climate, tags } = context;

  // get environment from context hook
  const { env, setEnv } = useEnvironmentContext({
    terrain: context.terrain,
    climate: context.climate,
    tags: context.tags,
  });
  

  // Dynamically derive shopType/venueType from form state
  const getShopType = useCallback(() => {
    if (siteType === "shop") return methods.watch("shopType")?.toLowerCase();
    if (siteType === "entertainment") return methods.watch("venueType")?.toLowerCase();
    return undefined;
  }, [siteType, methods]);

  const generateName = useCallback(async () => {
    if (!siteType || !env) return;

    const shopType = getShopType();
    const name = await generateSiteName({
      siteType: [siteType],
      shopType,
      terrain: env.terrain,
      climate: env.climate,
      tags: env.tags,
    });

    methods.setValue("name", name);
  }, [siteType, methods, getShopType, env]);

  const generateMenu = useCallback(async () => {
    if (!siteType || !env) return;

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
  }, [siteType, methods, getShopType, env]);

  const generateAll = useCallback(async () => {
    if (!siteType || !env ) return;

    const shopType = getShopType();
    const generatedValues = await generateSiteValues(siteType, {
      shopType,
      terrain: env.terrain,
      climate: env.climate,
      tags: env.tags,
      name: methods.getValues("name"),
      size: methods.getValues("size"),
      condition: methods.getValues("condition"),
    });

    Object.entries(generatedValues).forEach(([key, value]) => {
      methods.setValue(key as keyof SiteFormData, value);
    });

    await generateMenu();
  }, [siteType, methods, env, generateMenu, getShopType]);

  const reroll = useCallback(async () => {
    if (!siteType || !env) return;

    const shopType = getShopType();
    const generatedValues = await generateSiteValues(siteType, {
      shopType,
      terrain: env.terrain,
      climate: env.climate,
      tags: env.tags,
    });

    Object.entries(generatedValues).forEach(([key, value]) => {
      methods.setValue(key as keyof SiteFormData, value);
    });

    await generateMenu();
  }, [siteType, env, methods, generateMenu, getShopType]);

  // Guard clause: if any required param is missing, return null (or undefined)
  if (!siteType || !terrain.length || !climate || !tags.length) {
    return {
      name: () => {},
      menu: () => {},
      all: () => {},
      reroll: () => {},
    };
  }

  return {
    name: generateName,
    menu: generateMenu,
    all: generateAll,
    reroll,
  };
}
