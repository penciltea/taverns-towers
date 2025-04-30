'use client'

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import { deleteTown } from "@/lib/actions/town.actions";
import DeleteButton from "@/components/Common/DeleteButton";

export default function TownActions({ townId }: { townId: string }) {
  const router = useRouter();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();
  const handleEdit = () => {
    router.push(`/towns/${townId}/edit`);
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
            queryClient.invalidateQueries({ queryKey: ['towns'] });
            router.push("/towns/all");
            showSnackbar('Town deleted successfully!', 'success');
          }}
        />
      </Box>
    </>
  );
}