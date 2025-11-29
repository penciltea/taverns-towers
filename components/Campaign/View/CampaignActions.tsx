'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import DeleteButton from "@/components/Common/Button/DeleteButton";
import { CampaignForClient } from "@/interfaces/campaign.interface";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";
import { useCampaignPermissionsQuery } from "@/hooks/campaign/campaign.query";
import { useCampaignStore } from "@/store/campaignStore";
import { invalidateCampaignQueries } from "@/lib/util/invalidateQuery";

export default function CampaignActions({ campaign }: { campaign: CampaignForClient }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

  const user = session?.user ? { id: session.user.id } : null;

  const editable = canEdit(user?.id, { userId: campaign.userId }, campaignPermissions ?? undefined);
  const deletable = canDelete(user?.id, { userId: campaign.userId }, campaignPermissions ?? undefined);

  const handleEdit = () => {
    router.push(`/campaigns/${campaign._id}/edit`);
  };

  return (
    <>
      <Box>
        { editable && 
          (
            <Button sx={{ mx: 1 }} variant="outlined" color="secondary" startIcon={<EditIcon />}  onClick={handleEdit}>Edit</Button>
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
                    invalidateCampaignQueries(queryClient, campaign._id);
                    router.push("/campaigns/all");
                    showSnackbar('Campaign deleted successfully!', 'success');
                }}
            />
          )}
      </Box>
    </>
  );
}