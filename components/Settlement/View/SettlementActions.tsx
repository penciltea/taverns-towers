'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import { deleteSettlement } from "@/lib/actions/settlement.actions";
import DeleteButton from "@/components/Common/DeleteButton";
import { Settlement } from "@/interfaces/settlement.interface";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";

export default function SettlementActions({ _id, userId, editors }: Settlement) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();

  const user = session?.user ? { id: session.user.id } : null;

  const editable = canEdit(user, { userId, editors });
  const deletable = canDelete(user, { userId});

  const handleEdit = () => {
    router.push(`/settlements/${_id}/edit`);
  };

  return (
    <>
      <Box>
        { editable && <Button sx={{ mx: 1 }} variant="outlined" startIcon={<EditIcon />}  onClick={handleEdit}>
            Edit
          </Button>
        }
        {
          deletable && (
          <DeleteButton
            id={_id}
            entity="settlement"
            deleteAction={deleteSettlement}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['ownedSettlements'] });
              queryClient.removeQueries({ queryKey: ['settlement', _id] }); // remove single settlement cache
              router.push("/settlements/all");
              showSnackbar('Settlement deleted successfully!', 'success');
            }}
          />
          )}
      </Box>
    </>
  );
}