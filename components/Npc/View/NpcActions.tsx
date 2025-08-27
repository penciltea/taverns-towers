'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import { deleteNpc } from "@/lib/actions/npc.actions";
import DeleteButton from "@/components/Common/DeleteButton";
import { Npc } from "@/interfaces/npc.interface";
import { canDelete, canEdit } from "@/lib/auth/authPermissions";

export default function NpcActions({ _id, userId, editors }: Npc) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();

  const user = session?.user ? { id: session.user.id } : null;

  const editable = canEdit(user, { userId, editors });
  const deletable = canDelete(user, { userId});

  const handleEdit = () => {
    router.push(`/npcs/${_id}/edit`);
  };

  return (
    <>
      <Box>
        { editable && <Button sx={{ mx: 1, color: "#1d2a3b" }} variant="contained" color="primary" startIcon={<EditIcon />}  onClick={handleEdit}>
            Edit
          </Button>
        }
        {
          deletable && (
          <DeleteButton
            id={_id}
            entity="npc"
            deleteAction={deleteNpc}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['ownedNpcs'] });
              router.push("/npcs/all");
              showSnackbar('NPC deleted successfully!', 'success');
            }}
          />
          )}
      </Box>
    </>
  );
}