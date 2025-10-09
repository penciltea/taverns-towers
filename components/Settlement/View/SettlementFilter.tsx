"use client";

import SelectInput from "@/components/Common/SelectInput";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { Box } from "@mui/material";
import { FormChipSelect, FormSelect } from "@/components/Form";
import FilterBar from "@/components/Grid/FilterBar";
import FilterDialog from "@/components/Grid/FilterDialog";
import { settlementFilterSchema } from "@/schemas/settlement.schema";
import { useUIStore } from "@/store/uiStore";
import { ContentFilters } from "@/store/contentStore";
import { DefaultSettlementQueryParams } from "@/interfaces/settlement.interface";
import { z } from "zod";
import { SIZE_TYPES, MAGIC_LEVELS, WEALTH_LEVELS } from "@/constants/settlement.options";
import { TERRAIN_TYPES, TAG_TYPES, CLIMATE_TYPES } from "@/constants/environment.options";
import { TONE } from "@/constants/common.options";

type SettlementFiltersProps = {
  filters: ContentFilters;
  setFilters: (newFilters: Partial<ContentFilters>) => void;
};

export default function SettlementFilters({ filters, setFilters }: SettlementFiltersProps) {
  const { openDialog, setOpenDialog, closeDialog } = useUIStore();

  const handleApply = (data: z.infer<typeof settlementFilterSchema>) => {
    setFilters({ ...data });
    closeDialog();
  };

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        clearFilters={() => {
          setFilters(DefaultSettlementQueryParams);
        }}
        onOpenAdvanced={() => setOpenDialog('filterDialog')}
      >
        <SelectInput
          label="Size"
          value={filters.size != null ? filters.size.toString() : ""}
          onChange={(e) =>
            setFilters({ size: e.target.value })
          }
          options={toSelectOptions(SIZE_TYPES)}
        />
        
      </FilterBar>

      {openDialog === 'filterDialog' && (
        <FilterDialog
          open
          onClose={closeDialog}
          onSubmit={handleApply}
          schema={settlementFilterSchema}
          defaultValues={{
            ...filters,
            tags: filters.tags ?? [],
            terrain: filters.terrain ?? [],
            climate: filters.climate ?? "",
            wealth: filters.wealth ?? "",
            magic: filters.magic ?? "",
            tone: filters.tone ?? []
          }}
        >
          {(control) => (
            <Box display="flex" flexDirection="column" gap={2}>
              <FormChipSelect
                name="tags"
                label="Tags"
                control={control}
                options={toSelectOptions(TAG_TYPES)}
              />
              <FormChipSelect
                name="terrain"
                label="Terrain"
                control={control}
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
              <FormChipSelect
                name="tone"
                label="Tone"
                control={control}
                options={toSelectOptions(TONE)}
              />
            </Box>
          )}
        </FilterDialog>
      )}
    </>
  );
}
