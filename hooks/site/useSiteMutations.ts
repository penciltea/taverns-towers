'use client'

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from "@tanstack/react-query";
import { SiteFormData } from "@/schemas/site.schema";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { addConnection } from "@/lib/actions/connections.actions";
import { invalidateConnections } from "@/lib/util/invalidateQuery";
import { transformSiteFormData } from "@/lib/util/transformFormDataForDB";
import { createSite, updateSite } from "@/lib/actions/site.actions";
import { SiteType } from "@/interfaces/site.interface";


interface UseSiteMutationsProps {
    mode: "add" | "edit" | null;
    settlementId: string;
    siteId?: string; // Required in edit mode
}

export function useSiteMutations({ mode, settlementId, siteId} : UseSiteMutationsProps){
    const router = useRouter();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const queryClient = useQueryClient();

    async function handleSubmit(data: SiteFormData){
        setSubmitting(true);
        try{
            // Upload image if needed
            const cleanImage = await handleDynamicFileUpload(data, "image");

            // Transform form data for DB and attach the image
            const siteData = {
                ...transformSiteFormData(data),
                image: cleanImage,
            } as SiteType;
 
            let saved;
            
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

    return {
        handleSubmit
    };
}