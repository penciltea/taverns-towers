'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from "@mui/material";
import { useRouter } from "next/navigation";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import { useUIStore } from "@/store/uiStore";

export default function SettlementTypeDialog({ open, onClose }: DialogProps) {
  const router = useRouter();
  const { closeDialog } = useUIStore();

  const handleGenerator = () => {
    router.push('/settlements/generate');
    closeDialog();
  };

  const handleManualCreation = () => {
    router.push('/settlements/new');
    closeDialog();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a Settlement</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1"> Do you want full control or a little help from the arcane forces? </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleManualCreation}> Create Manually </Button>
        <Button color="primary" variant="contained" onClick={handleGenerator}> Generate with Magic </Button>
      </DialogActions>
    </Dialog>
  );
}
