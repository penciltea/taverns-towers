'use client'

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { SightListProps } from "@/interfaces/sight.interface";
import { useUIStore } from "@/store/uiStore";
import { SightType } from '@/interfaces/sight.interface';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { usePaginatedSights } from "@/hooks/sight.query";
import SightDetailsDialog from "@/components/Sight/Dialog/SightDetailsDialog";
import FilteredGridView from "@/components/Grid/FilteredGridView";
import { LOCATION_CATEGORIES } from "@/constants/sightOptions";
import ChipFilters from "@/components/Grid/ChipFilters";
import { SightFilters } from "@/interfaces/sight.interface";
import GridItem from "@/components/Grid/GridItem";
import { DefaultSightFilters } from "@/interfaces/sight.interface";
import FilterBar from "@/components/Grid/FilterBar";

export default function SightList({ settlementId, onDelete }: SightListProps) {
  if (!settlementId) {
    return <Typography color="error">Invalid settlement ID</Typography>;
  }

  const { openDialog, closeDialog } = useUIStore();
  const [selected, setSelected] = useState<SightType | null>(null);

  const [filters, setFilters] = useState<SightFilters>({
    ...DefaultSightFilters,
    settlementId, // use the prop value, not the default ""
  });

  const { data, isLoading } = usePaginatedSights(
    filters.settlementId,
    filters.page,
    filters.limit,
    filters.type,
    filters.search
  );
  
  const sights = data?.sights || [];
  const totalCount = data?.total || 0;
  
  return (
    <>
      <FilteredGridView<SightType>
        title="Sights"
        titleVariant="h4"
        titleComponent="h4"
        content="sights"
        searchVariant="h5"
        searchComponent="h5"
        countVariant="h6"
        countComponent="h6"
        items={sights}
        renderItem={(sight) => (
          <GridItem
            key={sight._id}
            title={sight.name}
            image={sight.image}
            subtitle={getLabelFromValue(LOCATION_CATEGORIES, sight.type)}
            onClick={() => {
              setSelected(sight);
              useUIStore.getState().setOpenDialog('SightDetailsDialog');
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
              setFilters({ ...DefaultSightFilters, settlementId }); // reset to default + settlement
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
        currentPage={filters.page}
        onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage }))}
        totalCount={totalCount}
        pageSize={filters.limit}
        fabLabel="Add Sight"
        fabLink={`/settlements/${settlementId}/sights/new`}
      />

      {openDialog === 'SightDetailsDialog' && selected && (
        <SightDetailsDialog
          open
          onClose={closeDialog}
          sightData={selected}
          settlementId={settlementId}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
