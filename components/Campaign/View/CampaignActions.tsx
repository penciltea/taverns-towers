'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import DeleteButton from "@/components/Common/Button/DeleteButton";
import { Campaign } from "@/interfaces/campaign.interface";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";

export default function CampaignActions({ campaign }: { campaign: Campaign }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();

  const user = session?.user ? { id: session.user.id } : null;

  const editable = canEdit(user, { userId: campaign.userId, editors: campaign.players.filter((player) => player.roles.includes('editor')).map((player) => player.name) });
  const deletable = canDelete(user, { userId: campaign.userId});

  const handleEdit = () => {
    router.push(`/campaigns/${campaign._id}/edit`);
  };

  return (
    <>
      <Box>
        { editable && 
          (
            
              <Button sx={{ mx: 1 }} variant="outlined" color="secondary" startIcon={<EditIcon />}  onClick={handleEdit}>
                Edit
              </Button>
          )
        }
        {
          deletable && (
            <DeleteButton
                id={campaign._id}
                entity="campaign"
                deleteAction={async (id) => {
                    const { deleteCampaign } = await import('@/lib/actions/campaign.actions');
                    return deleteCampaign(id);
                }}
                onSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: ['ownedCampaigns'] });
                    queryClient.removeQueries({ queryKey: ['campaign', campaign._id] }); // remove single campaign cache
                    router.push("/campaigns/all");
                    showSnackbar('Campaign deleted successfully!', 'success');
                }}
            />
          )}
      </Box>
    </>
  );
}