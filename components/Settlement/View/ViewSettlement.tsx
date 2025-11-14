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
import { canEdit, canDelete } from "@/lib/auth/authPermissions";
import EntityViewLayout from "@/components/Layout/EntityView/EntityViewLayout";
import EntityViewImage from "@/components/Layout/EntityView/EntityViewImage";
import { useCampaignPermissionsQuery } from '@/hooks/campaign/campaign.query';
import { useCampaignStore } from '@/store/campaignStore';
import { deleteSettlement } from '@/lib/actions/settlement.actions';
import { useSettlementMutations } from '@/hooks/settlement/useSettlementMutations';
import EntityViewActions from "@/components/Layout/EntityView/EntityViewActions";

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
  
  const creatable = canEdit(user?.id, { userId: settlement.userId }, campaignPermissions ?? undefined);
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
    queryClient.invalidateQueries({ queryKey: ['highlights'] });
  };

  const handleDelete = async () => {
    try {
      await deleteSettlement(settlement._id);
      queryClient.invalidateQueries({ queryKey: ['ownedSettlements'] });
      router.push("/settlements/all");
      showSnackbar('Settlement deleted successfully!', 'success');
    } catch (err) {
      console.error("Failed to delete settlement:", err);
    }
  };

  return (
    <EntityViewLayout
      title={ settlement.name }
      actions={ 
        <EntityViewActions
          item={settlement}
          canFavorite={canFavorite}
          canEdit={editable}
          canDelete={deletable}
          canHighlight={canHighlight}
          onToggleFavorite={async (updated) => {
            await handlePartialUpdate({ _id: updated._id, favorite: updated.favorite });
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
          }}
          onEdit={handleEdit}
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
