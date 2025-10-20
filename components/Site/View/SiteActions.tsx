'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import DeleteButton from "@/components/Common/DeleteButton";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";
import SiteFavorite from "./SiteFavorite";
import { SiteTypeMap } from "@/interfaces/site.interface";


interface SiteActionsProps<T extends keyof SiteTypeMap> {
  site: SiteTypeMap[T];
}

export default function SiteActions<T extends keyof SiteTypeMap>({ site }: SiteActionsProps<T>) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();

  const user = session?.user ? { id: session.user.id } : null;

  const editable = canEdit(user, { userId: site.userId, editors: site.editors });
  const deletable = canDelete(user, { userId: site.userId});

  const handleEdit = () => {
    router.push(`/settlements/${site.settlementId ? site.settlementId : 'wilderness'}/sites/${site._id}`);
  };

  return (
    <>
      <Box>
        { editable && 
          (
            <>
              <SiteFavorite site={site} />
              <Button sx={{ mx: 1 }} variant="outlined" color="secondary" startIcon={<EditIcon />}  onClick={handleEdit}>
                Edit
              </Button>
            </>
          )
        }
        {
          deletable && (
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
          )}
      </Box>
    </>
  );
}