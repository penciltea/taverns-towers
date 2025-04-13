'use client'

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTown } from "@/lib/actions/town.actions";
import DeleteConfirmationDialog from "../dialog/DeleteConfirmationDialog";

export default function TownActions({ townId }: { townId: string }) {
  const router = useRouter();
  const { openDialog, setOpenDialog } = useUIStore();
  const [isPending, startTransition] = useTransition();

  const handleEdit = () => {
    router.push(`/towns?id=${townId}`);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      await deleteTown(townId);
      router.push("/towns");
    });
  };

  return (
    <>
      <Box>
        <Button sx={{ mx: 1 }} variant="outlined" startIcon={<EditIcon />}  onClick={handleEdit}>
          Edit
        </Button>
        <Button 
          sx={{ mx: 1 }} 
          variant="text" 
          startIcon={<DeleteIcon />} 
          onClick={() => useUIStore.getState().setOpenDialog('deleteConfirmationDialog')}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </Box>

      {openDialog === 'deleteConfirmationDialog' && (
        <DeleteConfirmationDialog
          open
          onClose={() => setOpenDialog('deleteConfirmationDialog')}
          onConfirm={handleConfirmDelete}
          deleting="town"
        />
      )}
    </>
  );
}