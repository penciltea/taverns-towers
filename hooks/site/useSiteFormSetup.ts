import { SiteFormData } from "@/schemas/site.schema";
import { UseFormReturn } from "react-hook-form";
import { useSiteEnvironment } from "./useSiteEnvironment";
import { useSiteGeneratorActions } from "./useSiteGeneratorActions";
import { isValidSiteCategory } from "@/lib/util/siteHelpers";

interface UseSiteFormSetupParams {
  methods: UseFormReturn<SiteFormData>;
  settlementId: string;
  rawSiteType?: unknown; // e.g. string from params or selectedItem.type
}

export function useSiteFormSetup({
    methods,
    settlementId,
    rawSiteType,
}: UseSiteFormSetupParams) {
    const { context, isWilderness } = useSiteEnvironment(settlementId);

    // Validate or fallback the siteType
    const siteType =
        (typeof rawSiteType === "string" || rawSiteType === null) && isValidSiteCategory(rawSiteType)
            ? (rawSiteType as SiteFormData["type"])
            : "miscellaneous";

    // Factors that will get passed on through to generators
    const terrain = methods.watch("terrain") || context?.terrain || [];
    const climate = methods.watch("climate") || context?.climate || "";
    const tags = methods.watch("tags") || context?.tags || [];
    const magic = context?.magic || "";
    const wealth = context?.wealth || "";
    const siteTheme = methods.watch("siteTheme") || [];

    const generator = useSiteGeneratorActions(
        methods,
        {
            siteType,
            terrain,
            climate,
            tags,
            magic,
            wealth,
            siteTheme
        },
        isWilderness,
        settlementId
    );

    return { generator, isWilderness };
}