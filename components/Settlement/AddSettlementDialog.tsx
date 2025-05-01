'use client'
import { useRouter } from "next/navigation";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CasinoIcon from '@mui/icons-material/Casino';
import { useUIStore } from "@/store/uiStore";
import { DialogProps } from "@/interfaces/dialogProps.interface";

export default function AddSettlementDialog({ open, onClose }: DialogProps) {
    const router = useRouter();
    const { toggleDrawer, closeDialog } = useUIStore();

    const handleAddSettlementClick = () => {
        toggleDrawer();
        router.push('/settlements');
        closeDialog();
    };

  return (
    <Dialog open={open} onClose={onClose} sx={{padding: 3}}>
      <DialogTitle>New Settlement</DialogTitle>
      <DialogContent>
        <Typography variant="body1">How would you like to create a new settlement?</Typography>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<CreateIcon />} onClick={handleAddSettlementClick} sx={{marginRight: 0.5}}>build manually</Button>
        <Button variant="contained" startIcon={<CasinoIcon />} sx={{marginLeft: 0.5}}>generate randomly</Button>
      </DialogActions>
    </Dialog>
  );
}
