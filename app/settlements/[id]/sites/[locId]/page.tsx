'use client'

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { FormProvider } from "react-hook-form";
import { siteSchema, SiteFormData } from "@/schemas/site.schema";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import { updateSite, getSiteById } from "@/lib/actions/site.actions";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSiteFormData } from "@/lib/util/transformFormDataForDB";
import SiteForm from "@/components/Site/Form/SiteForm";
import { getSingleParam } from "@/lib/util/getSingleParam";
import { useFormMode } from "@/hooks/useFormMode";
import { useSiteGenerator } from "@/hooks/useSiteGenerator";
import { useSiteGenerationContext } from "@/hooks/useSiteGenerationContext";
import { isValidSiteCategory } from "@/lib/util/siteHelpers";
import { useQueryClient } from "@tanstack/react-query";

export default function EditSitePage() {
  const params = useParams();
  const settlementId = params.id as string;
  const { locId } = useParams();
  const safeId = getSingleParam(locId);
  const router = useRouter();

  const { showSnackbar, showErrorDialog } = useUIStore();
  const { selectedItem, mode } = useSiteContentStore();

  // Load the site and set mode to "edit"
  useFormMode(safeId, useSiteContentStore, getSiteById);

  const queryClient = useQueryClient();

  const methods = useFormWithSchema<typeof siteSchema>(siteSchema);
  const { reset } = methods;

  // Load site data and reset form when selectedItem updates
  useEffect(() => {
    if (!selectedItem) return;

    reset({
      ...(selectedItem as SiteFormData),
      image: selectedItem.image ?? undefined,
    });
  }, [selectedItem, reset]);

  // Load site generation context
  const { context, isWilderness } = useSiteGenerationContext(settlementId);

  // Extract and validate siteType from loaded site
  const rawSiteType = selectedItem?.type ?? null;
  const siteType = isValidSiteCategory(rawSiteType)
        ? (rawSiteType as SiteFormData["type"])
        : undefined;

  // Provide safe defaults for generator inputs
  const safeContext = {
    terrain: context?.terrain ?? [],
    climate: context?.climate ?? "",
    tags: context?.tags ?? [],
  };

  // Initialize generator hook with safe values
  const generator = useSiteGenerator(methods, {
    siteType: siteType ?? "miscellaneous",
    terrain: safeContext.terrain,
    climate: safeContext.climate,
    tags: safeContext.tags,
  }, isWilderness);

  const onSubmit = async (data: SiteFormData) => {
    const cleanImage = await handleDynamicFileUpload(data, "image");

    if (!safeId) {
      showErrorDialog("There was a problem saving this site, please try again later!");
      return;
    }

    try {
      const siteData = {
        ...transformSiteFormData(data),
        image: cleanImage,
      };

      await updateSite(siteData, safeId);

      if (settlementId !== "wilderness") {
        queryClient.invalidateQueries({
          queryKey: ['sites', settlementId],
        });
      }

      showSnackbar("Site updated successfully!", "success");
      router.push(`/settlements/${settlementId}`);
    } catch {
      showErrorDialog("Something went wrong, please try again later!");
    }
  };

  return (
    <FormProvider {...methods}>
      <SiteForm
        onSubmit={onSubmit}
        mode="edit"
        generator={generator}
        isWilderness={isWilderness}
      />
    </FormProvider>
  );
}
