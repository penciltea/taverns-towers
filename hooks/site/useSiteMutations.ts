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


interface UseSiteMutationsProps {
    mode: "add" | "edit" | null;
    settlementId: string;
    siteId?: string; // Required in edit mode
}

interface PartialSiteUpdate {
  _id: string;
  [key: string]: unknown;
}

export function useSiteMutations({ mode, settlementId, siteId} : UseSiteMutationsProps){
    const router = useRouter();
    const { user } = useAuthStore();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const queryClient = useQueryClient();

    async function handleSubmit(data: SiteFormData){
        setSubmitting(true);
        try{
            if (!user?.id) throw new Error("User is not logged in");
            
            const { canCreateContent } = await import("@/lib/actions/user.actions");
            if (!(await canCreateContent(user.id, "site"))) {
                showErrorDialog("You have reached the maximum number of sites for your membership tier. Please either upgrade your membership tier or delete an existing site to continue.");
                return;
            }

            const idempotencyKey = generateIdempotencyKey();

            // Upload image if needed
            const cleanImage = await handleDynamicFileUpload(data, "image");

            // Transform form data for DB and attach the image
            const siteData = {
                ...transformSiteFormData(data),
                image: cleanImage,
                idempotencyKey
            } as SiteType;
 
            let saved;
            
            const { createSite, updateSite } = await import('@/lib/actions/site.actions')
            if (mode === "add") {
                saved = await createSite(siteData, settlementId);
            } else if (mode === "edit") {
            if (!siteId) throw new Error("Site ID is required for edit mode");
                saved = await updateSite(siteData, siteId);
            } else {
                throw new Error("Invalid mutation mode");
            }

            if (!saved || !saved._id) {
                throw new Error("There was a problem saving the site, please try again later!");
            }

            if (data.connections?.length) {
                for (const conn of data.connections) {
                    const { addConnection } = await import('@/lib/actions/connections.actions');
                    await addConnection({
                        sourceType: "site",
                        sourceId: saved._id,
                        targetType: conn.type,
                        targetId: conn.id,
                        role: conn.role,
                    });

                    queryClient.setQueryData([conn.type, conn.id], (old: any) => {
                        if (!old) return old;
                        return {
                            ...old,
                            connections: [
                            ...old.connections,
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

            queryClient.invalidateQueries({
                queryKey: ['sites', settlementId],
                exact: false
            });

            router.push(`/settlements/${settlementId}`);

        } catch (error) {
            let message = "Something went wrong saving the site. Please try again later.";

            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === "string") {
                message = error;
            }

            showErrorDialog(message);
            console.error("Site mutation error:", error);
        } finally {
            setSubmitting(false);
        }
    }

    /**
     * Lightweight partial update — e.g. toggling "favorite"
     */
    async function handlePartialUpdate<T extends PartialSiteUpdate>(
        update: T
    ): Promise<void> {
        if (!user?.id) throw new Error("User is not logged in");

        const { updateSite } = await import("@/lib/actions/site.actions");
        const idempotencyKey = generateIdempotencyKey();
        const payload = { ...update, idempotencyKey };

        // Update the query cache immediately so UI re-renders
        queryClient.setQueryData(['ownedSites'], (old: any) => {
            if (!old?.sites) return old;
            return {
            ...old,
            sites: old.sites.map((s: SiteType) =>
                s._id === update._id ? { ...s, ...update } : s
            ),
            };
        });

        try {
            // Call server
            const updatedSite = await updateSite(payload, update._id);

            // Make sure cache matches server response
            queryClient.setQueryData(['ownedSites'], (old: any) => {
            if (!old?.sites) return old;
            return {
                ...old,
                sites: old.sites.map((s: SiteType) =>
                s._id === updatedSite._id ? updatedSite : s
                ),
            };
            });

            showSnackbar("Site updated successfully!", "success");
        } catch (error) {
            // Rollback if server fails
            queryClient.invalidateQueries(['ownedSites']);
            console.error("Failed to update site:", error);
            throw error;
        }
    }

    return {
        handleSubmit,
        handlePartialUpdate
    };
}