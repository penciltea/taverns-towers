'use client'

import { useState } from "react";
import { Box, Chip, Button, Typography, Skeleton } from "@mui/material";
import GridContainer from "@/components/Grid/GridContainer";
import GridItem from "@/components/Grid/GridItem";
import { LOCATION_CATEGORIES } from "@/constants/locationOptions";
import { LocationListProps } from "@/interfaces/location.interface";
import { useUIStore } from "@/store/uiStore";
import LocationDetailsDialog from "@/components/Location/Dialog/LocationDetailsDialog";
import { LocationType } from '@/interfaces/location.interface';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";

export default function LocationList({ locations, onDelete }: LocationListProps) {
  const { openDialog, closeDialog } = useUIStore();
  const [location, setLocation] = useState<LocationType | null>(null);

  const { tId } = useUIStore();
  
  // Check if locations are still loading
  const isLoading = !locations; // You can also check if a loading state is passed down

  return (
    <>
      <Typography variant="h6" sx={{width: '100%', marginTop: 2}}>Filter by Category </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 3, sm: 3, md: 1 },
          justifyContent: {xs: 'center', md: 'flex-start'},
          margin: 1
        }}
      >
        {LOCATION_CATEGORIES.map((category) => (
          <Chip
            key={category.value}
            label={category.label}
            variant="outlined"
            sx={{
              cursor: 'pointer',
              padding: { xs: '10px 16px', sm: '12px 18px' },
              fontSize: { xs: '0.75rem', sm: '1rem' },
            }}
          />
        ))}
      </Box>
      <Button variant="text" sx={{ margin: "0 auto", display: "block" }}>View All</Button>
      <GridContainer>
        { locations.length <= 0 ? (
          <Typography variant="subtitle1" sx={{ textAlign: 'center', margin: '0 auto' }}>
            No locations have been added yet!
          </Typography>
        ) : (
          locations.map((location) => (
            <GridItem 
              key={location._id} 
              onClick={() => {
                setLocation(location);
                useUIStore.getState().setOpenDialog('LocationDetailsDialog');
              }}
              title={location.name} 
              subtitle={getLabelFromValue(LOCATION_CATEGORIES, location.type)} 
              image={location.image}
            />
          ))
        )}
      </GridContainer>

      {openDialog === 'LocationDetailsDialog' && location && (
        <LocationDetailsDialog open onClose={closeDialog} locationData={location} townId={tId ?? ''} onDelete={onDelete} />
      )}
    </>
  );
}
