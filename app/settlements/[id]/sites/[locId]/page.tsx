'use client'

import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { SiteFormData, siteSchema } from "@/schemas/site.schema";
import { useSiteContentStore } from "@/store/siteStore";
import SiteForm from "@/components/Site/Form/SiteForm";
import { getSingleParam } from "@/lib/util/getSingleParam";
import { useFormMode } from "@/hooks/useFormMode";
import { useSiteFormSetup } from "@/hooks/site/useSiteFormSetup";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";
import { useSiteMutations } from "@/hooks/site/useSiteMutations";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useEffect, useState } from "react";
import { useGetSiteById } from "@/hooks/site/site.query";
import { mapSiteToForm } from "@/lib/util/siteHelpers";
import { NpcConnection } from "@/interfaces/connection.interface";
import { useHandleDeletedConnections } from "@/hooks/connection/useHandleDeletedConnections";
import { useUIStore } from "@/store/uiStore";

export default function EditSitePage() {
  const { id, locId } = useParams();
  const settlementId = id as string;
  const safeId = getSingleParam(locId);
  const [initialConnections, setInitialConnections] = useState<NpcConnection[]>([]);

  const { showErrorDialog } = useUIStore();
  const { mode, selectedItem, setSelectedItem, clearSelectedItem } = useSiteContentStore();
  const methods = useFormWithSchema<typeof siteSchema>(siteSchema);

  const { handleSubmit } = useSiteMutations({
      mode,
      settlementId,
      siteId: safeId
  });

  const { data: site, isLoading, isError } = useGetSiteById(safeId ?? '');
  const { handleDeletedConnections } = useHandleDeletedConnections<SiteFormData>("site");

  useFormMode(safeId, useSiteContentStore);
  

  const { generator, isWilderness } = useSiteFormSetup({
      methods,
      settlementId,
      rawSiteType: selectedItem?.type,
  });
  
  // Once site is fetched, hydrate store
  useEffect(() => {
    if (isLoading) return;

    if (site?.success && site.site) {
      setSelectedItem(site.site);
      setInitialConnections(site.site.connections);
      methods.reset({
        ...(mapSiteToForm(site.site) as SiteFormData)
      });
    } else if (safeId && !isLoading) {
      clearSelectedItem();
      showErrorDialog("Site could not be found, please try again later!");
    }
  }, [site, isLoading, safeId, setSelectedItem, clearSelectedItem, methods, showErrorDialog]);

  const wrappedOnSubmit = async (data: SiteFormData) => {
    const normalizedConnections = Array.isArray(data.connections) ? data.connections : [];
    
    await handleDeletedConnections({
      sourceId: safeId ?? "",
      initialConnections,
      currentConnections: data.connections,
      formData: data,
      onConfirm: async (formData) => {
        await handleSubmit(formData);
      },
    });

    // Update initialConnections so next deletion is correct
    setInitialConnections(normalizedConnections);
  };
  
  if (!safeId) {
    return <div className="error-message">Invalid site ID.</div>;
  }

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