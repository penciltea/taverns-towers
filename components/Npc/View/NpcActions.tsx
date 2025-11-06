'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import DeleteButton from "@/components/Common/Button/DeleteButton";
import { Npc } from "@/interfaces/npc.interface";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";
import FavoriteButton from "@/components/Common/Button/FavoriteButton";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { useCampaignStore } from "@/store/campaignStore";
import { useCampaignPermissionsQuery } from "@/hooks/campaign/campaign.query";

export default function NpcActions({ npc }: { npc: Npc }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

  const user = session?.user ? { id: session.user.id } : null;
  

  const canFavorite = canEdit(user, { userId: npc.userId});
  const editable = canEdit(user, {userId: npc.userId}) || campaignPermissions?.canManageNpcs;
  const deletable = canDelete(user, { userId: npc.userId});

  const { handlePartialUpdate } = useNpcMutations({ mode: "edit", npcId: npc._id });

  const handleEdit = () => {
    router.push(`/npcs/${npc._id}/edit`);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "initial",gap: 1 }}>
        { canFavorite && 
          <FavoriteButton<Npc>
            item={npc}
            onToggleFavorite={async (updated) => {
              await handlePartialUpdate({ _id: updated._id, favorite: updated.favorite });
              queryClient.invalidateQueries({ queryKey: ["favorites"] });
            }}
          />
        }
        { editable && 
          <Button 
            size="medium" 
            sx={{ color: "#1d2a3b" }} 
            variant="contained" color="primary" 
            startIcon={<EditIcon />}  
            onClick={handleEdit}
          >
            Edit
          </Button>
        }
        { deletable &&
          <DeleteButton
            id={npc._id}
            entity="npc"
            deleteAction={async (id) => {
              const { deleteNpc } = await import('@/lib/actions/npc.actions');
              return deleteNpc(id);
            }}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['ownedNpcs'] });
              router.push("/npcs/all");
              showSnackbar('NPC deleted successfully!', 'success');
            }}
          />
        }
      </Box>
    </>
  );
}