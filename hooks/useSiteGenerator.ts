import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { SiteFormData } from "@/schemas/site.schema";
import { generateSiteName, generateMenuItems } from "@/lib/actions/siteGenerator.actions";
import { generateSiteValues } from "@/lib/modules/sites/siteRules";

type GeneratorContext = {
  siteType: SiteFormData["type"] | undefined;
  terrain: string[];
  climate: string;
  tags: string[];
};

export function useSiteGenerator(
  methods: UseFormReturn<SiteFormData>,
  context: GeneratorContext
) {
  const { siteType, terrain, climate, tags } = context;

  // 🔹 Dynamically derive shopType/venueType from form state
  const getShopType = useCallback(() => {
    if (siteType === "shop") return methods.watch("shopType")?.toLowerCase();
    if (siteType === "entertainment") return methods.watch("venueType")?.toLowerCase();
    return undefined;
  }, [siteType, methods]);

  const generateName = useCallback(async () => {
    if (!siteType) return;

    const shopType = getShopType();
    const name = await generateSiteName({
      siteType: [siteType],
      shopType,
      terrain,
      climate,
      tags,
    });

    methods.setValue("name", name);
  }, [siteType, terrain, climate, tags, methods, getShopType]);

  const generateMenu = useCallback(async () => {
    if (!siteType) return;

    const shopType = getShopType();
    const menuItems = await generateMenuItems({
      siteType: [siteType],
      shopType,
      settlementTerrain: terrain,
      settlementClimate: climate,
      settlementTags: tags,
    });

    const cleanedItems = menuItems.map((item) => ({
      name: item.name || "",
      price: String(item.price || ""),
      category: item.category || undefined,
      description: item.description || undefined,
    }));

    methods.setValue("menu", cleanedItems);
  }, [siteType, terrain, climate, tags, methods, getShopType]);

  const generateAll = useCallback(async () => {
    if (!siteType) return;

    const shopType = getShopType();
    const generatedValues = await generateSiteValues(siteType, {
      shopType,
      terrain,
      climate,
      tags,
      name: methods.getValues("name"),
      size: methods.getValues("size"),
      condition: methods.getValues("condition"),
    });

    Object.entries(generatedValues).forEach(([key, value]) => {
      methods.setValue(key as keyof SiteFormData, value);
    });

    await generateMenu();
  }, [siteType, terrain, climate, tags, methods, generateMenu, getShopType]);

  const reroll = useCallback(async () => {
    if (!siteType) return;

    const shopType = getShopType();
    const generatedValues = await generateSiteValues(siteType, {
      shopType,
      terrain,
      climate,
      tags,
    });

    Object.entries(generatedValues).forEach(([key, value]) => {
      methods.setValue(key as keyof SiteFormData, value);
    });

    await generateMenu();
  }, [siteType, terrain, climate, tags, methods, generateMenu, getShopType]);

  return {
    name: generateName,
    menu: generateMenu,
    all: generateAll,
    reroll,
  };
}
