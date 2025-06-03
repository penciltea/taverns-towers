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
import { usePaginatedSites } from "@/hooks/site.query";
import { useSiteGenerator } from "@/hooks/useSiteGenerator";
import { useSiteGenerationContext } from "@/hooks/useSiteGenerationContext";
import { isValidSiteCategory } from "@/lib/util/siteHelpers";
import { SiteCategory } from "@/constants/siteOptions";

export default function EditSitePage() {
  const params = useParams();
  const settlementId = params.id as string;
  const { locId } = useParams();
  const safeId = getSingleParam(locId);
  const router = useRouter();

  const { showSnackbar, showErrorDialog } = useUIStore();
  const { setSelectedItem, selectedItem, mode } = useSiteContentStore();

  // Use existing form mode hook (sets mode to "edit" and loads site)
  useFormMode(safeId, useSiteContentStore, getSiteById);

  const { refetch } = usePaginatedSites(settlementId, 1, 12, [], "");

  const methods = useFormWithSchema<typeof siteSchema>(siteSchema);
  const { reset } = methods;

  // Load site data when safeId changes, and reset form
  useEffect(() => {
    if (!selectedItem) return;

    reset({
        ...(selectedItem as SiteFormData),
        image: selectedItem.image ?? undefined,
    });
  }, [selectedItem, reset]);

  // Get generation context (may load async wilderness context inside this hook)
  const { context, isWilderness } = useSiteGenerationContext(settlementId);

  // Extract and validate siteType from selectedItem
  const rawSiteType = selectedItem?.type ?? null;
  const siteType = isValidSiteCategory(rawSiteType) ? (rawSiteType as SiteCategory) : undefined;

  const generator = useSiteGenerator(methods, {
    siteType,
    terrain: context?.terrain ?? [],
    climate: context?.climate ?? "",
    tags: context?.tags ?? [],
  });

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
        await refetch();
      }

      showSnackbar("Site updated successfully!", "success");
      router.push(`/settlements/${settlementId}`);
    } catch {
      showErrorDialog("Something went wrong, please try again later!");
    }
  };

  // Show loading state until selectedItem is ready
  if (!selectedItem) {
    return <div>Loading site...</div>;
  }

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
