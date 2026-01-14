'use client'

import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from "@tanstack/react-query";
import { SiteFormData } from "@/schemas/site.schema";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { invalidateConnections, invalidateSiteQueries } from "@/lib/util/invalidateQuery";
import { transformSiteFormData } from "@/lib/util/transformFormDataForDB";
import { SiteType } from "@/interfaces/site.interface";
import { useAuthStore } from "@/store/authStore";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";
import { siteKeys } from "./site.query";
import { useCampaignStore } from "@/store/campaignStore";
import { isUserVerified } from "@/lib/util/isUserVerified";
import { handleActionResult } from "../queryHook.util";
import { AppError } from "@/lib/errors/app-error";


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
  const { user } = useAuthStore();
  const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();

  // -----------------------------
  // Full form submit (create/edit)
  // -----------------------------
  async function handleSubmit(data: SiteFormData): Promise<string | undefined> {
    setSubmitting(true);
    try {
      if (!user?.id) throw new AppError("User is not logged in", 400);

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
        const result = await createSite(siteData, settlementId);
        saved = handleActionResult(result);
      } else if (mode === "edit"){
        if(!siteId) throw new AppError("Site ID is required for editing.", 400);

        const { updateSite } = await import("@/lib/actions/site.actions");
        const result = await updateSite(siteData, siteId, selectedCampaign?._id ?? undefined);
        saved = handleActionResult(result);
      } else {
        throw new AppError("Invalid mutation mode", 400);
      }

      if (!saved || !saved._id) {
        throw new AppError("There was a problem saving the site, please try again later!", 500);
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

      // Invalidate site queries
      invalidateSiteQueries(queryClient, settlementId, selectedCampaign?._id);

      return saved._id.toString();
    } catch (error) {
      let message = "Something went wrong saving the site. Please try again later.";
      if (error instanceof Error) message = error.message;
      showErrorDialog(message);
      // console.error("Site mutation error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  // -----------------------------
  // Lightweight Partial Update
  // -----------------------------
  async function handlePartialUpdate<T extends PartialSiteUpdate>(update: T): Promise<void> {
    if (!user?.id) throw new AppError("User is not logged in", 400);

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

    settlementQueries.forEach((query) => {
      queryClient.setQueryData<SitesBySettlementData>(query.queryKey, (old) => {
        if (!old) return old;

        const data = handleActionResult(old);

        return {
          success: true,
          data: {
            ...data,
            sites: data.sites.map((s) =>
              s._id === update._id ? { ...s, ...update } : s
            )
          }
        };
      });
    });

    // Update individual site cache
    queryClient.setQueryData<SiteData>(siteKeys.detail(update._id), (old) => {
      return old ? { ...old, ...update } : old;
    });

    try {
      const result = await updateSitePartial(update._id, payload);
      const updatedSite = handleActionResult(result);

      // Apply server response to caches
      settlementQueries.forEach((query) => {
        queryClient.setQueryData<SitesBySettlementData>(query.queryKey, (old) => {
          if (!old) return old;

          const data = handleActionResult(old);
          return {
            success: true,
            data: {
              ...data,
              sites: data.sites.map((s) =>
                s._id === update._id ? { ...s, ...update } : s
              )
            }
          };
        });
      });

      queryClient.setQueryData<SiteData>(["site", updatedSite._id], {
        success: true,
        data: updatedSite,
      });
    } catch (error) {
      throw new AppError(`There was a problem updating the site: ${error}`, 500);
    }
  }

  return {
    handleSubmit,
    handlePartialUpdate,
  };
}