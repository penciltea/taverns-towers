'use client';


import { useCampaignStore } from "@/store/campaignStore";
import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCampaignPermissionsQuery } from "@/hooks/campaign/campaign.query";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { NpcProps } from "@/interfaces/npc.interface";
import NpcDetails from './NpcDetails';
import NpcConnections from './NpcConnections';
import EntityViewLayout from '@/components/Layout/EntityView/EntityViewLayout';
import EntityViewImage from '@/components/Layout/EntityView/EntityViewImage';
import NpcDescriptions from './NpcDescriptions';
import EntityViewActions from "@/components/Layout/EntityView/EntityViewActions";
import { copyNpc, deleteNpc } from "@/lib/actions/npc.actions";
import { canEdit, canDelete } from "@/lib/auth/authPermissions";
import { handleActionResult } from "@/hooks/queryHook.util";

export default function ViewNpc({ npc }: NpcProps){
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

  const user = session?.user ? { id: session.user.id } : null;

  const canFavorite = user?.id === npc.userId;
  const editable = canEdit(user?.id, { userId: npc.userId }, campaignPermissions ?? undefined);
  const deletable = canDelete(user?.id, { userId: npc.userId }, campaignPermissions ?? undefined);
  const canHighlight = (campaignPermissions !== null && campaignPermissions?.isOwner === true)

  const { handlePartialUpdate } = useNpcMutations({ mode: "edit", npcId: npc._id });

  const handleEdit = () => {
    router.push(`/npcs/${npc._id}/edit`);
  };

  const handleHighlight = async () => {
    await handlePartialUpdate({ _id: npc._id, campaignHighlight: !npc.campaignHighlight });
    queryClient.invalidateQueries({ queryKey: ['highlights'] });
  };

  const handleDelete = async () => {
    try {
      await deleteNpc(npc._id);
      queryClient.invalidateQueries({ queryKey: ['ownedNpcs'] });
      router.push("/npcs/all");
      showSnackbar('NPC deleted successfully!', 'success');
    } catch (err) {
      console.error("Failed to delete NPC:", err);
    }
  };

  const handleCopy = async () => {
    try {
      const result = await copyNpc(npc._id);
      const newNpc = handleActionResult(result);
      queryClient.invalidateQueries({ queryKey: ['ownedNpcs'] });
      router.push(`/npcs/${newNpc._id}/`);
      showSnackbar('NPC copied successfully!', 'success');
    } catch (err) {
      console.error("Failed to copy NPC: ", err);
    }
  }

  return (
    <EntityViewLayout
      title={ npc.name }
      actions={ 
        <EntityViewActions
          item={npc}
          canFavorite={canFavorite}
          canEdit={editable}
          canDelete={deletable}
          canHighlight={canHighlight}
          canCopy={editable}
          onToggleFavorite={async (updated) => {
            await handlePartialUpdate({ _id: updated._id, favorite: updated.favorite });
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
          }}
          onEdit={handleEdit}
          onDelete={() => handleDelete()}
          onCopy={() => handleCopy()}
          onHighlight={handleHighlight}
        />
      }
      leftContent={ <NpcDetails npc={npc} /> }
      rightContent={
          <EntityViewImage
            title="Portrait"
            imageUrl={npc.image ?? undefined}
            placeholderText={`Portrait of ${npc.name}`}
            fallbackText="No NPC portait uploaded."
          />
      }
      extraContent={ <NpcDescriptions npc={npc} userId={npc.userId}/> }
      connections={ <NpcConnections connections={npc.connections} /> }
    />
  )
}