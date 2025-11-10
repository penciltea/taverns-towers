'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import DeleteButton from "@/components/Common/Button/DeleteButton";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";
import { SiteType, SiteTypeMap } from "@/interfaces/site.interface";
import FavoriteButton from "@/components/Common/Button/FavoriteButton";
import { useSiteMutations } from "@/hooks/site/useSiteMutations";
import { useCampaignStore } from "@/store/campaignStore";
import { useCampaignPermissionsQuery } from "@/hooks/campaign/campaign.query";


interface SiteActionsProps<T extends keyof SiteTypeMap> {
  site: SiteTypeMap[T];
}

export default function SiteActions<T extends keyof SiteTypeMap>({ site }: SiteActionsProps<T>) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

  const user = session?.user ? { id: session.user.id } : null;

  const canFavorite = canEdit(user?.id, { userId: site.userId });
  const editable = canEdit(user?.id, { userId: site.userId }, campaignPermissions ?? undefined);
  const deletable = canDelete(user?.id, { userId: site.userId});

  const handleEdit = () => {
    router.push(`/settlements/${site.settlementId ? site.settlementId : 'wilderness'}/sites/${site._id}`);
  };

  const { handlePartialUpdate } = useSiteMutations({ mode: "edit", settlementId: site.settlementId ?? "wilderness", siteId: site._id});

  return (
    <>
      <Box>
        { canFavorite && 
          <FavoriteButton<SiteType>
            item={site}
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
        { deletable &&
          <DeleteButton
            id={site._id}
            entity="site"
            deleteAction={async (id) => {
              const { deleteSite } = await import('@/lib/actions/site.actions');
              return deleteSite(id);
            }}
            onSuccess={() => {
              router.push("/sites");
              queryClient.invalidateQueries({ queryKey: ['sites', 'owned'], exact: false });
              queryClient.invalidateQueries({ queryKey: ['sites', 'settlement', site.settlementId], exact: false });
              showSnackbar('Site deleted successfully!', 'success');
            }}
          />
        }
      </Box>
    </>
  );
}