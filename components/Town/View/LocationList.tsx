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
import { usePaginatedLocations } from "@/hooks/location.query";
import PaginationControls from "@/components/Common/Pagination";

export default function LocationList({ townId, onDelete }: LocationListProps) {
  const { openDialog, closeDialog } = useUIStore();
  const [location, setLocation] = useState<LocationType | null>(null);
  const [params, setParams] = useState<{
    page: number;
    limit: number;
    townId: string;
    type: string[];
  }>({
    page: 1,
    limit: 5,
    townId,
    type: [],
  });

  const {
    data: locationData,
    isLoading,
    isError,
    isFetching,
    refetch,
    error,
  } = usePaginatedLocations(townId, params.page, params.limit, params.type);

  const handlePage = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
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
        {LOCATION_CATEGORIES.map((category) => {
          const isSelected = params.type.includes(category.value);

          return (
            <Chip
              key={category.value}
              label={category.label}
              variant={isSelected ? 'filled' : 'outlined'}
              color={isSelected ? 'primary' : 'default'}
              onClick={() => {
                setParams((prev) => {
                  const currentTypes = prev.type;
                  const isAlreadySelected = currentTypes.includes(category.value);
                  const updatedTypes = isAlreadySelected
                    ? currentTypes.filter((t) => t !== category.value) // remove if selected
                    : [...currentTypes, category.value]; // add if not selected
              
                  return {
                    ...prev,
                    type: updatedTypes,
                    page: 1,
                  };
                });
              }}
              sx={{
                cursor: 'pointer',
                padding: { xs: '10px 16px', sm: '12px 18px' },
                fontSize: { xs: '0.75rem', sm: '1rem' },
              }}
            />
          );
        })}
      </Box>

      <Button 
        variant="text" 
        sx={{ margin: "0 auto", display: "block" }}
        size="small"
        onClick={() =>
          setParams((prev) => ({ ...prev, type: [], page: 1 }))
        }
      >
        Clear All
      </Button>

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
        <PaginationControls
          currentPage={locationData?.currentPage || 1}
          totalPages={locationData?.totalPages || 1}
          onPageChange={handlePage}
        />
      </Box>

      {openDialog === 'LocationDetailsDialog' && location && (
        <LocationDetailsDialog open onClose={closeDialog} locationData={location} townId={townId} onDelete={onDelete} />
      )}
    </>
  );
}
