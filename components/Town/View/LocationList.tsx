'use client'

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { LocationListProps } from "@/interfaces/location.interface";
import { useUIStore } from "@/store/uiStore";
import { LocationType } from '@/interfaces/location.interface';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { usePaginatedLocations } from "@/hooks/location.query";
import LocationDetailsDialog from "@/components/Location/Dialog/LocationDetailsDialog";
import FilteredGridView from "@/components/Grid/FilteredGridView";
import { LOCATION_CATEGORIES } from "@/constants/locationOptions";
import ChipFilters from "@/components/Grid/ChipFilters";
import { LocationFilters } from "@/interfaces/location.interface";
import GridItem from "@/components/Grid/GridItem";
import { DefaultLocationFilters } from "@/interfaces/location.interface";
import FilterBar from "@/components/Grid/FilterBar";

export default function LocationList({ townId, onDelete }: LocationListProps) {
  if (!townId) {
    return <Typography color="error">Invalid town ID</Typography>;
  }

  const { openDialog, closeDialog } = useUIStore();
  const [selected, setSelected] = useState<LocationType | null>(null);

  const [filters, setFilters] = useState<LocationFilters>({
    ...DefaultLocationFilters,
    townId, // use the prop value, not the default ""
  });

  const { data, isLoading } = usePaginatedLocations(
    filters.townId,
    filters.page,
    filters.limit,
    filters.type,
    filters.search
  );
  
  const locations = data?.locations || [];
  

  return (
    <>
      <FilteredGridView<LocationType>
        title="Locations"
        content="locations"
        items={locations}
        renderItem={(location) => (
          <GridItem
            key={location._id}
            title={location.name}
            image={location.image}
            subtitle={getLabelFromValue(LOCATION_CATEGORIES, location.type)}
            onClick={() => {
              setSelected(location);
              useUIStore.getState().setOpenDialog('LocationDetailsDialog');
            }}
          />
        )}
        filterComponent={
          <FilterBar
            filters={filters}
            setFilters={(newFilters) =>
              setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
            }
            clearFilters={() => {
              setFilters(DefaultLocationFilters);
            }}
          >
            <Box sx={{ gridColumn: '1 / -1', gridRow: 2, width: '100%' }}>
              <Typography variant="h6"> Filter by Category </Typography>
              <ChipFilters
                options={LOCATION_CATEGORIES}
                selected={filters.type}
                onChange={(newTypes) =>
                  setFilters((prev) => ({ ...prev, type: newTypes, page: 1 }))
                }
              />
            </Box>
          </FilterBar>
        }
        fabLabel="Add Location"
        fabLink={`/towns/${townId}/locations/new`}
      />


      {openDialog === 'LocationDetailsDialog' && selected && (
        <LocationDetailsDialog
          open
          onClose={closeDialog}
          locationData={selected}
          townId={townId}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
