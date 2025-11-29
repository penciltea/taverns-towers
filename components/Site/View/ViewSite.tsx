'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from '@tanstack/react-query';
import { useSiteMutations } from "@/hooks/site/useSiteMutations";
import { useCampaignStore } from "@/store/campaignStore";
import { useCampaignPermissionsQuery } from "@/hooks/campaign/campaign.query";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";
import EntityViewLayout from "@/components/Layout/EntityView/EntityViewLayout";
import EntityViewImage from "@/components/Layout/EntityView/EntityViewImage";
import type { SiteType, SiteTypeMap } from '@/interfaces/site.interface';
import SiteDetails from './SiteDetails';
import SiteConnections from './SiteConnections';
import SiteDescriptions from './SiteDescriptions';
import { copySite, deleteSite } from "@/lib/actions/site.actions";
import EntityViewActions from "@/components/Layout/EntityView/EntityViewActions";
import { handleActionResult } from "@/hooks/queryHook.util";
import { invalidateCampaignQueries, invalidateSiteQueries, invalidateUserQueries } from "@/lib/util/invalidateQuery";

interface ViewSiteProps {
  site: SiteType;
}

export default function ViewSite({ site }: ViewSiteProps) {
  const typedSite = site as SiteTypeMap[keyof SiteTypeMap];
   const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

  const user = session?.user ? { id: session.user.id } : null;

  const canFavorite = user?.id === site.userId;
  const editable = canEdit(user?.id, { userId: site.userId }, campaignPermissions ?? undefined);
  const deletable = canDelete(user?.id, { userId: site.userId});
  const canHighlight = (campaignPermissions !== null && campaignPermissions?.isOwner === true)

  const handleEdit = () => {
    router.push(`/settlements/${site.settlementId ? site.settlementId : 'wilderness'}/sites/${site._id}`);
  };

  const { handlePartialUpdate } = useSiteMutations({ mode: "edit", settlementId: site.settlementId ?? "wilderness", siteId: site._id});
  
  const handleHighlight = async () => {
    await handlePartialUpdate({ _id: site._id, campaignHighlight: !site.campaignHighlight });
    if(selectedCampaign?._id){
      invalidateCampaignQueries(queryClient, selectedCampaign?._id);
    }
  };

  const handleCopy = async () => {
      try {
        const result = await copySite(site._id);
        const newSite = handleActionResult(result);
        invalidateSiteQueries(queryClient,site._id, site.settlementId);
        
        router.push(`/sites/${newSite._id}/`);
        showSnackbar('Site copied successfully!', 'success');
      } catch (err) {
        console.error("Failed to copy site: ", err);
      }
    }

  const handleDelete = async () => {
      try {
        await deleteSite(site._id);
        invalidateSiteQueries(queryClient,site._id, site.settlementId);
              
        router.push("/sites/all");
        showSnackbar('Site deleted successfully!', 'success');
      } catch (err) {
        console.error("Failed to delete site:", err);
      }
    };

  return (
    <EntityViewLayout
      title={ site.name }
      actions={ 
        <EntityViewActions
            item={site}
            canFavorite={canFavorite}
            canEdit={editable}
            canCopy={editable}
            canDelete={deletable}
            canHighlight={canHighlight}
            onToggleFavorite={async (updated) => {
              await handlePartialUpdate({ _id: updated._id, favorite: updated.favorite });
              invalidateUserQueries(queryClient, user!.id);
            }}
            onEdit={handleEdit}
            onCopy={() => handleCopy()}
            onDelete={() => handleDelete()}
            onHighlight={handleHighlight}
          />
      }
      leftContent={ <SiteDetails site={typedSite} /> }
      rightContent={
          <EntityViewImage
            title="Map"
            imageUrl={site.image ?? undefined}
            placeholderText={`Map of ${site.name}`}
            fallbackText="No map image uploaded."
          />
      }
      extraContent={ <SiteDescriptions site={site} userId={site.userId} /> }
      connections={ <SiteConnections connections={site.connections} /> }
    />
  );
}
