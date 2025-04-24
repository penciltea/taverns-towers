import { Dialog, DialogTitle, DialogContent, Box, Button, Typography } from '@mui/material';
import { LocationDialogProps, LocationType } from '@/interfaces/location.interface';
import { LOCATION_CATEGORIES } from '@/constants/locationOptions';
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

const getLocationLabel = (type: string) => {
    const category = LOCATION_CATEGORIES.find(cat => cat.value === type);
    return category ? category.label : type;
  };

export default function LocationDetailsDialog({ open, onClose, locationData: locationData }: LocationDialogProps) {
    const Component = (LocationTypeComponents as any)[locationData.type] as React.ComponentType<any>;

    const locationLabel = getLocationLabel(locationData.type);
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth scroll="paper">
        <DialogTitle>{locationData.name} ({locationLabel})</DialogTitle>
        <DialogContent>
          {Component ? (
            <Component location={locationData} />
          ) : (
            <Typography>No details available for this location type.</Typography>
          )}
        </DialogContent>
  
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </Box>
      </Dialog>
    );
}