'use client'

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryClient } from '@tanstack/react-query';
import { deleteSettlement } from "@/lib/actions/settlement.actions";
import DeleteButton from "@/components/Common/DeleteButton";

export default function SettlementActions({ settlementId }: { settlementId: string }) {
  const router = useRouter();
  const { showSnackbar } = useUIStore();
  const queryClient = useQueryClient();
  const handleEdit = () => {
    router.push(`/settlements/${settlementId}/edit`);
  };

  return (
    <>
      <Box>
        <Button sx={{ mx: 1 }} variant="outlined" startIcon={<EditIcon />}  onClick={handleEdit}>
          Edit
        </Button>
        <DeleteButton
          id={settlementId}
          entity="settlement"
          deleteAction={deleteSettlement}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['ownedSettlements'] });
            router.push("/settlements/all");
            showSnackbar('Settlement deleted successfully!', 'success');
          }}
        />
      </Box>
    </>
  );
}