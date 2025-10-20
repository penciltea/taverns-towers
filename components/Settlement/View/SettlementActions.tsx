'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import DeleteButton from "@/components/Common/DeleteButton";
import { Settlement } from "@/interfaces/settlement.interface";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";
import SettlementFavorite from "./SettlementFavorite";

export default function SettlementActions({ settlement }: { settlement: Settlement }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();

  const user = session?.user ? { id: session.user.id } : null;

  const editable = canEdit(user, { userId: settlement.userId, editors: settlement.editors });
  const deletable = canDelete(user, { userId: settlement.userId});

  const handleEdit = () => {
    router.push(`/settlements/${settlement._id}/edit`);
  };

  return (
    <>
      <Box>
        { editable && 
          (
            <>
              <SettlementFavorite settlement={settlement} />
              <Button sx={{ mx: 1 }} variant="outlined" color="secondary" startIcon={<EditIcon />}  onClick={handleEdit}>
                Edit
              </Button>
            </>
          )
        }
        {
          deletable && (
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
          )}
      </Box>
    </>
  );
}