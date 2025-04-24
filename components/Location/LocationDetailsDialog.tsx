import { Dialog, DialogTitle, DialogContent, Box, Button, Typography } from '@mui/material';
import { LocationDialogProps } from '@/interfaces/location.interface';

export default function LocationDetailsDialog({ open, onClose, location }: LocationDialogProps) {
    return(
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle>Additional Details - {location.name}</DialogTitle>
            <DialogContent>
                <Typography><strong>Size:</strong> {location.size || "N/A"}</Typography>
            </DialogContent>

            <Box display="flex" justifyContent="flex-end" p={2}>
                <Button variant="outlined" onClick={onClose}>Close</Button>
            </Box>
        </Dialog>
    )
}