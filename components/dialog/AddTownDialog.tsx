'use client'
import { useRouter } from "next/navigation";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CasinoIcon from '@mui/icons-material/Casino';
import { useUIStore } from "@/store/uiStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddTownDialog({ open, onClose }: Props) {
    const router = useRouter();
    const { toggleDrawer, closeDialog } = useUIStore();

    const handleAddTownClick = () => {
        toggleDrawer();
        router.push('/towns');
        closeDialog();
    };

  return (
    <Dialog open={open} onClose={onClose} sx={{padding: 3}}>
      <DialogTitle>New Town</DialogTitle>
      <DialogContent>
        <Typography variant="body1">How would you like to create a new town?</Typography>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<CreateIcon />} onClick={handleAddTownClick} sx={{marginRight: 0.5}}>build manually</Button>
        <Button variant="contained" startIcon={<CasinoIcon />} sx={{marginLeft: 0.5}}>generate randomly</Button>
      </DialogActions>
    </Dialog>
  );
}
