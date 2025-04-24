"use client";

import SelectInput from "@/components/Common/SelectInput";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { Box } from "@mui/material";
import { FormChipSelect, FormSelect } from "@/components/Form";
import { SIZE_TYPES, TERRAIN_TYPES, TAG_TYPES, CLIMATE_TYPES, MAGIC_LEVELS, WEALTH_LEVELS } from "@/constants/townOptions";
import { useTownContentStore } from "@/store/townStore";
import { Town } from "@/interfaces/town.interface";
import FilterBar from "@/components/Grid/FilterBar";
import { ContentFilters } from "@/store/contentStore";
import FilterDialog from "@/components/Grid/FilterDialog";
import { townFilterSchema } from "@/schemas/townSchema";
import { useUIStore } from "@/store/uiStore";
import * as z from "zod";

const townFilterFn = (item: Town, filters: ContentFilters): boolean => {
  const rules = [
    () => !filters.search || item.name?.toLowerCase().includes(filters.search.toLowerCase()),
    () => !filters.size || item.size === filters.size,
    () => !filters.climate || item.climate === filters.climate,
    () => !filters.tags || filters.tags.every((tag: string) => item.tags?.includes(tag)),
    () => !filters.magic || item.magic === filters.magic,
    () => !filters.wealth || item.wealth === filters.wealth,
    () => !filters.terrain || filters.terrain.every((terrain: string) => item.terrain?.includes(terrain)),
  ];

  return rules.every(rule => rule());
};

export default function TownFilters() {
  const { openDialog, setOpenDialog, closeDialog } = useUIStore();
  const { filters, applyFilters, clearFilters } = useTownContentStore();

  const handleApply = (data: z.infer<typeof townFilterSchema>) => {
    applyFilters({ ...filters, ...data }, townFilterFn);
    closeDialog();
  };

  return (
    <>
    <FilterBar
      filters={filters}
      applyFilters={applyFilters}
      clearFilters={clearFilters}
      filterFn={townFilterFn}
      onOpenAdvanced={() => { setOpenDialog('filterDialog') }}
    >
      <SelectInput
        label="Size"
        value={filters.size || ""}
        onChange={(e) =>
          applyFilters({ ...filters, size: e.target.value }, townFilterFn)
        }
        options={toSelectOptions(SIZE_TYPES)}
      />
    </FilterBar>

    {openDialog === 'filterDialog' && (
      <FilterDialog 
        open
        onClose={closeDialog}
        onSubmit={handleApply}
        schema={townFilterSchema}
        defaultValues={{
          ...filters,
          tags: filters.tags ?? [],
          terrain: filters.terrain ?? [],
        }}
      >

        <Box display="flex" flexDirection="column" gap={2}>
          <FormChipSelect
            name="tags"
            label="Tags"
            options={toSelectOptions(TAG_TYPES)}
          />
          <FormChipSelect
            name="terrain"
            label="Terrain"
            options={toSelectOptions(TERRAIN_TYPES)}
          />
          <FormSelect
              name="climate"
              label="Climate"
              options={toSelectOptions(CLIMATE_TYPES)}
          />
          <FormSelect
              name="wealth"
              label="Wealth"
              options={toSelectOptions(WEALTH_LEVELS)}
          />
          <FormSelect
              name="magic"
              label="Magic Level / Use"
              options={toSelectOptions(MAGIC_LEVELS)}
          />
        </Box>
      </FilterDialog>
    )}
    </>
  );
}