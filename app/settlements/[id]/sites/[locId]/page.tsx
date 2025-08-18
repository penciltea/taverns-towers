'use client'

import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { defaultSiteValues, SiteFormData, siteSchema } from "@/schemas/site.schema";
import { useSiteContentStore } from "@/store/siteStore";
import SiteForm from "@/components/Site/Form/SiteForm";
import { getSingleParam } from "@/lib/util/getSingleParam";
import { useFormMode } from "@/hooks/useFormMode";
import { useSiteFormSetup } from "@/hooks/site/useSiteFormSetup";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";
import { useSiteMutations } from "@/hooks/site/useSiteMutations";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useEffect } from "react";
import { useGetSiteById } from "@/hooks/site/site.query";
import { mapSiteToForm } from "@/lib/util/siteHelpers";

export default function EditSitePage() {
  const { id, locId } = useParams();
  const settlementId = id as string;
  const safeId = getSingleParam(locId);

  if (!safeId) {
    return <div className="error-message">Invalid site ID.</div>;
  }

  const { mode, selectedItem, setSelectedItem } = useSiteContentStore();
  const methods = useFormWithSchema<typeof siteSchema>(siteSchema);

  const { handleSubmit } = useSiteMutations({
      mode,
      settlementId,
      siteId: safeId
  });

  const { data: site, isLoading, isError } = useGetSiteById(safeId ?? '');

  useFormMode(safeId, useSiteContentStore);
  

  const { generator, isWilderness } = useSiteFormSetup({
      methods,
      settlementId,
      rawSiteType: selectedItem?.type,
  });
  
  // Once site is fetched, hydrate store
  useEffect(() => {
    if (site) {
      setSelectedItem(site); // keep full DB object in store
      methods.reset({
        ...(mapSiteToForm(site) as SiteFormData) // cast here
      });
    }
  }, [site]);

  const wrappedOnSubmit = async (data: SiteFormData) => {
    await handleSubmit(data);
  };

  if (isLoading) return <p>Loading site...</p>;
  if (isError || !site) return <p>Site not found or failed to load.</p>;

  return (
    <SkeletonLoader loading={isLoading} skeleton={<Spinner />}>
      <FormProvider {...methods}>
        <SiteForm
          onSubmit={wrappedOnSubmit}
          mode={mode}
          generator={generator}
          isWilderness={isWilderness}
        />
      </FormProvider>
    </SkeletonLoader>
  );
}