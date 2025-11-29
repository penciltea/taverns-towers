'use client';

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUIStore } from '@/store/uiStore';
import { Settlement } from '@/interfaces/settlement.interface';
import SettlementDetails from "@/components/Settlement/View/SettlementDetails";
import SiteList from "@/components/Settlement/View/SiteList";
import FabButton from "@/components/Common/Button/fabButton";
import SettlementConnections from "./SettlementConnections";
import { useSession } from "next-auth/react";
import { canEdit, canDelete, canCreate } from "@/lib/auth/authPermissions";
import EntityViewLayout from "@/components/Layout/EntityView/EntityViewLayout";
import EntityViewImage from "@/components/Layout/EntityView/EntityViewImage";
import { useCampaignPermissionsQuery } from '@/hooks/campaign/campaign.query';
import { useCampaignStore } from '@/store/campaignStore';
import { copySettlement, deleteSettlement } from '@/lib/actions/settlement.actions';
import { useSettlementMutations } from '@/hooks/settlement/useSettlementMutations';
import EntityViewActions from "@/components/Layout/EntityView/EntityViewActions";
import { handleActionResult } from "@/hooks/queryHook.util";
import { invalidateCampaignQueries, invalidateSettlementQueries, invalidateUserQueries } from "@/lib/util/invalidateQuery";

interface ViewSettlementProps {
  settlement: Settlement;
}

export default function ViewSettlement({ settlement }: ViewSettlementProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setOpenDialog, showSnackbar } = useUIStore();
  const { data: session } = useSession();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);
  
  const user = session?.user ? { id: session.user.id } : null;
  
  const creatable = (selectedCampaign && canCreate(campaignPermissions ?? undefined)) || (user?.id === settlement.userId);
  const canFavorite = user?.id === settlement.userId;
  const editable = canEdit( user?.id, { userId: settlement.userId }, campaignPermissions ?? undefined );
  const deletable = canDelete( user?.id, { userId: settlement.userId} );
  const canHighlight = (campaignPermissions !== null && campaignPermissions?.isOwner === true)

  const { handlePartialUpdate } = useSettlementMutations({ mode: "edit", settlementId: settlement._id});
  
  const handleEdit = () => {
    router.push(`/settlements/${settlement._id}/edit`);
  };

  const handleHighlight = async () => {
    await handlePartialUpdate({ _id: settlement._id, campaignHighlight: !settlement.campaignHighlight });
    if(selectedCampaign?._id){
      invalidateCampaignQueries(queryClient, selectedCampaign?._id);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSettlement(settlement._id);
      invalidateSettlementQueries(queryClient, settlement._id, selectedCampaign?._id);
      router.push("/settlements/all");
      showSnackbar('Settlement deleted successfully!', 'success');
    } catch (err) {
      console.error("Failed to delete settlement:", err);
    }
  };

  const handleCopy = async () => {
      try {
        const result = await copySettlement(settlement._id);
        const newSettlement = handleActionResult(result);
        invalidateSettlementQueries(queryClient, settlement._id, selectedCampaign?._id);
        router.push(`/settlements/${newSettlement._id}/`);
        showSnackbar('Settlement copied successfully!', 'success');
      } catch (err) {
        console.error("Failed to copy settlement: ", err);
      }
    }


  return (
    <EntityViewLayout
      title={ settlement.name }
      actions={ 
        <EntityViewActions
          item={settlement}
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
      leftContent={ <SettlementDetails settlement={settlement} /> }
      rightContent={
          <EntityViewImage
            title="Map"
            imageUrl={settlement.map ?? undefined}
            placeholderText={`Map of ${settlement.name}`}
            fallbackText="No map image uploaded."
          />
      }
      extraContent={ <SiteList settlementId={settlement._id} /> }
      connections={ <SettlementConnections connections={settlement.connections} /> }
      fab={creatable && <FabButton label="Add Site" onClick={() => setOpenDialog('siteTypeDialog', { 
          dialogMode: 'direct', 
          settlementId: settlement._id, 
        })}  />}
    />
  );
}
