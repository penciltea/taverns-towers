'use client'

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTown } from "@/lib/actions/town.actions";
import DeleteConfirmationDialog from "../../Common/DeleteConfirmationDialog";
import DeleteButton from "@/components/Common/DeleteButton";

export default function TownActions({ townId }: { townId: string }) {
  const router = useRouter();
  const { openDialog, setOpenDialog, closeDialog, showSnackbar } = useUIStore();
  const [isPending, startTransition] = useTransition();

  const handleEdit = () => {
    router.push(`/towns/${townId}/edit`);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      await deleteTown(townId);
      closeDialog();
      router.push("/towns/all");
    });
  };

  return (
    <>
      <Box>
        <Button sx={{ mx: 1 }} variant="outlined" startIcon={<EditIcon />}  onClick={handleEdit}>
          Edit
        </Button>
        <DeleteButton
          id={townId}
          entity="town"
          deleteAction={deleteTown}
          onSuccess={() => {
            router.push("/towns/all");
            showSnackbar('Town deleted successfully!', 'success');
          }}
        />
      </Box>
    </>
  );
}