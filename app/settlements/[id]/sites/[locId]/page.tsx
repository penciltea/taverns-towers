'use client'

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { FormProvider } from "react-hook-form";
import { siteSchema, SiteFormData } from "@/schemas/site.schema";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import { updateSite } from "@/lib/actions/site.actions";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSiteFormData } from "@/lib/util/transformFormDataForDB";
import SiteForm from "@/components/Site/Form/SiteForm";
import { getSingleParam } from "@/lib/util/getSingleParam";
import { useFormMode } from "@/hooks/useFormMode";
import { useQueryClient } from "@tanstack/react-query";
import { useSiteFormSetup } from "@/hooks/site/useSiteFormSetup";
import { useSiteQuery } from "@/hooks/site/site.query";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";

export default function EditSitePage() {
  const { id, locId } = useParams();
  const settlementId = id as string;
  const safeId = getSingleParam(locId);

  if (!safeId) {
    return <div className="error-message">Invalid site ID.</div>;
  }

  const queryClient = useQueryClient();
  const { data: siteData, isLoading, error } = useSiteQuery(safeId);

  const { showSnackbar, showErrorDialog } = useUIStore();
  const { selectedItem, setSelectedItem, clearSelectedItem, mode } = useSiteContentStore();

  const router = useRouter();
  useFormMode(safeId, useSiteContentStore);

  const methods = useFormWithSchema<typeof siteSchema>(siteSchema);
  const { reset } = methods;

  useEffect(() => {
    if (isLoading) return;

    if (siteData) {
      // Only set selectedItem if different from current to avoid infinite loops
      if (selectedItem?._id !== siteData._id) {
        setSelectedItem(siteData);
        reset({
          ...(siteData as SiteFormData),
          image: siteData.image ?? undefined,
        });
      }
    } else {
      showErrorDialog("Site could not be found, please try again later!");
      clearSelectedItem();
    }
  }, [siteData, isLoading, setSelectedItem, clearSelectedItem, reset, showErrorDialog, selectedItem]);


  const { generator, isWilderness } = useSiteFormSetup({
    methods,
    settlementId,
    rawSiteType: selectedItem?.type,
  });

  const onSubmit = async (data: SiteFormData) => {
    const cleanImage = await handleDynamicFileUpload(data, "image");

    try {
      const siteData = {
        ...transformSiteFormData(data),
        image: cleanImage,
      };

      await updateSite(siteData, safeId);
      
      // Update React Query queries (both for getting all sites and getting site by ID)
      queryClient.invalidateQueries({ queryKey: ['site', safeId] });

      if (settlementId !== "wilderness") {
        queryClient.invalidateQueries({ queryKey: ['sites', settlementId] });
      }      

      clearSelectedItem();
      showSnackbar("Site updated successfully!", "success");
      router.push(`/settlements/${settlementId}`);
    } catch (error){
      console.error("Failed to update site: ", error);
      showErrorDialog("Something went wrong, please try again later!");
    }
  };

  return (
    <SkeletonLoader loading={isLoading} skeleton={<Spinner />}>
      <FormProvider {...methods}>
        <SiteForm
          onSubmit={onSubmit}
          mode={mode}
          generator={generator}
          isWilderness={isWilderness}
        />
      </FormProvider>
    </SkeletonLoader>
  );
}