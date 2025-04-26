import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, Stack } from '@mui/material';
import { LocationDialogProps, LocationType } from '@/interfaces/location.interface';
import { LOCATION_CATEGORIES } from '@/constants/locationOptions';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { TavernDetails } from './TavernDetails';
//import { TempleDetails } from './TempleDetails';
//import { BlacksmithDetails } from './BlacksmithDetails';

type LocationComponentMap = {
    tavern: React.ComponentType<{ location: Extract<LocationType, { type: 'tavern' }> }>;
    // temple: React.ComponentType<{ location: Extract<LocationType, { type: 'temple' }> }>;
    // blacksmith: React.ComponentType<{ location: Extract<LocationType, { type: 'blacksmith' }> }>;
  };

const LocationTypeComponents: LocationComponentMap = {
    tavern: TavernDetails,
    // temple: TempleDetails,
    // blacksmith: BlacksmithDetails,
};

export default function LocationDetailsDialog({ open, onClose, locationData: locationData }: LocationDialogProps) {
    const Component = (LocationTypeComponents as any)[locationData.type] as React.ComponentType<any>;
    const locationLabel = getLabelFromValue(LOCATION_CATEGORIES, locationData.type, "Unknown");
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
        <DialogTitle>{locationData.name} ({locationLabel})</DialogTitle>
        <DialogContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ justifyContent: 'space-between' }}
          >
            <Box>
              {Component ? (
                <Component location={locationData} />
              ) : (
                <Typography>No details available for this location type.</Typography>
              )}
            </Box>
            <Box>
              { locationData.image && (
              <img
                src= { locationData.image }
                alt={`Image for {location.name}`}
                style={{
                  borderRadius: '16px',
                  boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                  maxWidth: '20vw'
                }}
              />
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button startIcon={<DeleteIcon />} variant="outlined" color="error" onClick={() => {
            console.log("Delete clicked");
          }}>
            Delete
          </Button>

          <Box>
            <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
              Close
            </Button>
            <Button variant="contained" startIcon={<EditIcon />}  onClick={() => {
                console.log("Edit clicked");
              }}
            >
              Edit
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
}