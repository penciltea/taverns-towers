"use client";

import { z } from "zod";
import { Box } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import { ContentFilters } from "@/store/contentStore";
import SelectInput from "@/components/Common/SelectInput";
import FilterBar from "@/components/Grid/FilterBar";
import FilterDialog from "@/components/Grid/FilterDialog";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import {FormSelect } from "@/components/Form";
import { npcFilterSchema } from "@/schemas/npc.schema";
import { DefaultNpcQueryParams } from "@/interfaces/npc.interface";
import { NPC_AGE, NPC_RACES, NPC_PRONOUNS, NPC_STATUS, NPC_ALIGNMENT } from "@/constants/npc.options";


type NpcFiltersProps = {
  filters: ContentFilters;
  setFilters: (newFilters: Partial<ContentFilters>) => void;
};

export default function NpcFilters({ filters, setFilters }: NpcFiltersProps) {
  const { openDialog, setOpenDialog, closeDialog } = useUIStore();

  const handleApply = (data: z.infer<typeof npcFilterSchema>) => {
    setFilters({ ...data });
    closeDialog();
  };

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        clearFilters={() => {
          setFilters(DefaultNpcQueryParams);
        }}
        onOpenAdvanced={() => setOpenDialog('filterDialog')}
      >
        <SelectInput
          label="Race"
          value={filters.race != null ? filters.race.toString() : ""}
          onChange={(e) =>
            setFilters({ race: e.target.value })
          }
          options={NPC_RACES}
        />
        
      </FilterBar>

      {openDialog === 'filterDialog' && (
        <FilterDialog
          open
          onClose={closeDialog}
          onSubmit={handleApply}
          schema={npcFilterSchema}
          defaultValues={{ ...filters }}
        >
          {(control) => (
            <Box display="flex" flexDirection="column" gap={2}>
              <FormSelect
                name="age"
                label="Age"
                control={control}
                options={toSelectOptions(NPC_AGE)}
              />
              <FormSelect
                name="alignment"
                label="Alignment"
                control={control}
                options={toSelectOptions(NPC_ALIGNMENT)}
              />
              <FormSelect
                name="pronouns"
                label="Pronouns"
                control={control}
                options={toSelectOptions(NPC_PRONOUNS)}
              />
              <FormSelect
                name="status"
                label="Status"
                control={control}
                options={toSelectOptions(NPC_STATUS)}
              />
            </Box>
          )}
        </FilterDialog>
      )}
    </>
  );
}
