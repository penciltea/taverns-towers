'use client'

import { useState } from "react";
import { Box, Chip, Button, Typography, Skeleton, Pagination } from "@mui/material";
import GridContainer from "@/components/Grid/GridContainer";
import GridItem from "@/components/Grid/GridItem";
import { LOCATION_CATEGORIES } from "@/constants/locationOptions";
import { LocationListProps } from "@/interfaces/location.interface";
import { useUIStore } from "@/store/uiStore";
import LocationDetailsDialog from "@/components/Location/Dialog/LocationDetailsDialog";
import { LocationType } from '@/interfaces/location.interface';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { usePaginatedLocations } from "@/hooks/location.query";  // Assuming your custom hook is in this location

export default function LocationList({ townId, onDelete }: LocationListProps) {
  const { openDialog, closeDialog } = useUIStore();
  const [location, setLocation] = useState<LocationType | null>(null);

  const pageSize = 10; // Adjust the page size as needed

  // Use the custom paginated hook
  const page = 1; // Adjust as needed based on the selected page (this can be tracked with state)
  const type = ''; // Adjust to pass a location type if necessary

  const {
    data: locationData,
    isLoading,
    isError,
    isFetching,
    refetch,
    error,
  } = usePaginatedLocations(townId, page, pageSize, type);

  // Handle page change
  const handlePageChange = (event: any, newPage: number) => {
    refetch({ page: newPage, limit: pageSize, townId: townId });
  };

  return (
    <>
      <Typography variant="h6" sx={{ width: '100%', marginTop: 2 }}>Filter by Category </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 3, sm: 3, md: 1 },
          justifyContent: { xs: 'center', md: 'flex-start' },
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
        {isLoading || isFetching ? (
          <Skeleton variant="rectangular" width="100%" height={150} />
        ) : isError ? (
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            Error loading locations: {error?.message}
          </Typography>
        ) : locationData?.locations.length === 0 ? (
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            No locations have been added yet!
          </Typography>
        ) : (
          locationData?.locations.map((location: LocationType) => (
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

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={locationData?.totalPages || 1}
          page={locationData?.currentPage || 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {openDialog === 'LocationDetailsDialog' && location && (
        <LocationDetailsDialog open onClose={closeDialog} locationData={location} townId={townId} onDelete={onDelete} />
      )}
    </>
  );
}
