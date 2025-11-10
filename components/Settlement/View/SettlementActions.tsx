'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import DeleteButton from "@/components/Common/Button/DeleteButton";
import { Settlement } from "@/interfaces/settlement.interface";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";
import FavoriteButton from "@/components/Common/Button/FavoriteButton";
import { useSaveSettlement } from "@/hooks/settlement/useSaveSettlement";
import { useCampaignPermissionsQuery } from "@/hooks/campaign/campaign.query";
import { useCampaignStore } from "@/store/campaignStore";

export default function SettlementActions({ settlement }: { settlement: Settlement }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

  const user = session?.user ? { id: session.user.id } : null;

  const canFavorite = canEdit(user?.id, { userId: settlement.userId});
  const editable = canEdit(user?.id, { userId: settlement.userId }, campaignPermissions ?? undefined);
  const deletable = canDelete(user?.id, { userId: settlement.userId});

  const { handlePartialUpdate } = useSaveSettlement("edit", settlement._id);

  const handleEdit = () => {
    router.push(`/settlements/${settlement._id}/edit`);
  };

  return (
    <>
      <Box>
        { canFavorite && 
          <FavoriteButton<Settlement>
            item={settlement}
            onToggleFavorite={async (updated) => {
              await handlePartialUpdate({ _id: updated._id, favorite: updated.favorite });
              queryClient.invalidateQueries({ queryKey: ["favorites"] });
            }}
          />
        }
        { editable && 
          <Button sx={{ mx: 1 }} variant="outlined" color="secondary" startIcon={<EditIcon />}  onClick={handleEdit}>
            Edit
          </Button>
        }
        {
          deletable &&
          <DeleteButton
            id={settlement._id}
            entity="settlement"
            deleteAction={async (id) => {
              const { deleteSettlement } = await import('@/lib/actions/settlement.actions');
              return deleteSettlement(id);
            }}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['ownedSettlements'] });
              queryClient.removeQueries({ queryKey: ['settlement', settlement._id] }); // remove single settlement cache
              router.push("/settlements/all");
              showSnackbar('Settlement deleted successfully!', 'success');
            }}
          />
        }
      </Box>
    </>
  );
}