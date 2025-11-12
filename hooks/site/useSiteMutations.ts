'use client'

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from "@tanstack/react-query";
import { SiteFormData } from "@/schemas/site.schema";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { invalidateConnections } from "@/lib/util/invalidateQuery";
import { transformSiteFormData } from "@/lib/util/transformFormDataForDB";
import { SiteType } from "@/interfaces/site.interface";
import { useAuthStore } from "@/store/authStore";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";
import { siteKeys } from "./site.query";
import { useCampaignStore } from "@/store/campaignStore";
import { isUserVerified } from "@/lib/util/isUserVerified";


interface UseSiteMutationsProps {
    mode: "add" | "edit" | null;
    settlementId: string;
    siteId?: string; // Required in edit mode
}

interface PartialSiteUpdate {
  _id: string;
  [key: string]: unknown;
}

export function useSiteMutations({ mode, settlementId, siteId }: UseSiteMutationsProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();

  // -----------------------------
  // Full form submit (create/edit)
  // -----------------------------
  async function handleSubmit(data: SiteFormData) {
    setSubmitting(true);
    try {
      if (!user?.id) throw new Error("User is not logged in");

      if(!isUserVerified(user)){
        showErrorDialog("Your email address hasn't been verified yet. Magic can't preserve your work until it's confirmed.");
        return;
      }
      

      const idempotencyKey = generateIdempotencyKey();

      // Upload image if needed
      const cleanImage = await handleDynamicFileUpload(data, "image");

      // Transform form data for DB and attach the image
      const siteData = {
        ...transformSiteFormData(data),
        userId: user.id,
        image: cleanImage,
        campaignId: selectedCampaign && selectedCampaign._id !== null ? selectedCampaign._id : undefined,
        idempotencyKey,
      } as SiteType;

      let saved;

      if(mode === "add"){
        const { canCreateContent } = await import("@/lib/actions/user.actions");
        if (!(await canCreateContent(user.id, "site"))) {
          showErrorDialog(
            "You have reached the maximum number of sites for your membership tier. Please either upgrade your membership tier or delete an existing site to continue."
          );
          return;
        }
        const { createSite } = await import("@/lib/actions/site.actions");
        saved = await createSite(siteData, settlementId)
      } else if (mode === "edit"){
        if(!siteId) throw new Error("Site ID is required for editing.");

        const { updateSite } = await import("@/lib/actions/site.actions");
        saved = await updateSite(siteData, siteId, selectedCampaign?._id ?? undefined)
      } else {
        throw new Error("Invalid mutation mode");
      }

      if (!saved || !saved._id) {
        throw new Error("There was a problem saving the site, please try again later!");
      }

      // Handle connections
      if (data.connections?.length) {
        for (const conn of data.connections) {
          const { addConnection } = await import("@/lib/actions/connections.actions");
          await addConnection({
            sourceType: "site",
            sourceId: saved._id,
            targetType: conn.type,
            targetId: conn.id,
            role: conn.role,
          });

          queryClient.setQueryData([conn.type, conn.id], (old: unknown) => {
            if (!old || typeof old !== "object") return old;
            const prev = old as { connections?: unknown[] };
            return {
              ...prev,
              connections: [
                ...(prev.connections ?? []),
                { type: conn.type, refId: saved._id, role: conn.role },
              ],
            };
          });
        }

        invalidateConnections(queryClient, data.connections);
      }

      showSnackbar(
        mode === "edit" ? "Site updated successfully!" : "Site created successfully!",
        "success"
      );

      // Invalidate all relevant site lists
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: siteKeys.owned(), exact: false }),
        queryClient.invalidateQueries({ queryKey: siteKeys.settlement(settlementId), exact: false }),
        queryClient.invalidateQueries({ queryKey: siteKeys.public(), exact: false }),
        queryClient.invalidateQueries({ queryKey: siteKeys.campaign(selectedCampaign?._id), exact: false }),
      ]);

      router.push(`/settlements/${settlementId}`);
    } catch (error) {
      let message = "Something went wrong saving the site. Please try again later.";
      if (error instanceof Error) message = error.message;
      showErrorDialog(message);
      console.error("Site mutation error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  // -----------------------------
  // Lightweight Partial Update
  // -----------------------------
  async function handlePartialUpdate<T extends PartialSiteUpdate>(update: T): Promise<void> {
    if (!user?.id) throw new Error("User is not logged in");

    const { updateSitePartial } = await import("@/lib/actions/site.actions");
    const idempotencyKey = generateIdempotencyKey();
    const payload = { ...update, idempotencyKey };

    // Known query data types
    type SiteData = Awaited<ReturnType<typeof import("@/lib/actions/site.actions").getSiteById>>;
    type SitesBySettlementData = Awaited<ReturnType<typeof import("@/lib/actions/site.actions").getSitesBySettlement>>;

    const settlementQueries = queryClient
      .getQueryCache()
      .getAll()
      .filter(
        (q) =>
          Array.isArray(q.queryKey) &&
          q.queryKey[0] === siteKeys.all[0] && // 'sites'
          q.queryKey[1] === 'settlement' &&
          q.queryKey[2] === update.settlementId
      );

    queryClient.getQueryCache().getAll().forEach(q => console.log(q.queryKey));

    settlementQueries.forEach((query) => {
      queryClient.setQueryData<SitesBySettlementData>(query.queryKey, (old) => {
        if (!old?.sites) return old;
        const updated = {
          ...old,
          sites: old.sites.map((s) => (s._id === update._id ? { ...s, ...update } : s)),
        };

        return updated;
      });
    });

    // Update individual site cache
    queryClient.setQueryData<SiteData>(siteKeys.detail(update._id), (old) => {
      return old ? { ...old, ...update } : old;
    });

    try {
      const updatedSite = await updateSitePartial(update._id, payload);
      // Apply server response to caches
      settlementQueries.forEach((query) => {
        queryClient.setQueryData<SitesBySettlementData>(query.queryKey, (old) => {
          if (!old?.sites) return old;
          const updated = {
            ...old,
            sites: old.sites.map((s) => (s._id === updatedSite._id ? updatedSite : s)),
          };
          //console.log("Updated data after server response:", query.queryKey, updated);
          return updated;
        });
      });

      queryClient.setQueryData<SiteData>(["site", updatedSite._id], {
        success: true,
        site: updatedSite,
      });
    } catch (error) {
      console.error("Failed to update site:", error);
      throw error;
    }
  }

  return {
    handleSubmit,
    handlePartialUpdate,
  };
}