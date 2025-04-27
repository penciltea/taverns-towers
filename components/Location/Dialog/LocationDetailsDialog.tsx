import { Dialog, DialogTitle, DialogContent, Box, Button, Typography, Stack, DialogActions, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useUIStore } from "@/store/uiStore";
import { useTownContentStore } from '@/store/townStore';
import { deleteLocation } from '@/lib/actions/location.actions';
import { LocationDialogProps } from '@/interfaces/location.interface';
import { LOCATION_CATEGORIES } from '@/constants/locationOptions';
import { TavernDetails } from './TavernDetails';
import DeleteButton from '@/components/Common/DeleteButton';

const LocationTypeComponents = {
  tavern: TavernDetails,
};

const getLocationLabel = (type: string) => {
  const category = LOCATION_CATEGORIES.find(cat => cat.value === type);
  return category ? category.label : type;
};

export default function LocationDetailsDialog({ open, onClose, onDelete, townId, locationData }: LocationDialogProps) {
  const Component = (LocationTypeComponents as any)[locationData.type];
  const locationLabel = getLocationLabel(locationData.type);
  const router = useRouter();
  const { showSnackbar } = useUIStore();

  const handleEdit = () => {
    router.push(`/towns/${townId}/locations/${locationData._id}`);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
        <DialogTitle>
          {locationData.name} ({locationLabel})
        </DialogTitle>
        <DialogContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
          >
            <Box>
              {Component ? (
                <Component location={locationData} />
              ) : (
                <Typography>No details available for this location type.</Typography>
              )}
            </Box>
            <Box>
              {locationData.image && (
                <img
                  src={locationData.image}
                  alt={`Image for ${locationData.name}`}
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                    maxWidth: '20vw',
                  }}
                />
              )}
            </Box>
          </Stack>

          {/* Action buttons */}
          <DialogActions>
            <Button
              variant="outlined"
              sx={{ mx: 1 }}
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <DeleteButton
              id={locationData._id!}
              entity="location"
              deleteAction={deleteLocation}
              onSuccess={() => {
                if(!locationData._id){ return }
                if (onDelete) {
                  onDelete(locationData._id);
                  showSnackbar('Location deleted successfully!', 'success');
                }
              }}
            />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
