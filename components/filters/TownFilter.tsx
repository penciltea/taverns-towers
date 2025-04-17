"use client";

import { useState } from "react";
import { Box, IconButton, TextField, useMediaQuery, useTheme } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SelectInput from "@/components/filters/SelectInput";
import { TownFilterProps } from "@/interfaces/town.interface";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { CLIMATE_TYPES, SIZE_TYPES } from "@/constants/townOptions";
import { useUIStore } from "@/store/uiStore";
//import TownFilterDialog from "./TownFilterDialog";

export default function TownFilters({ filters, setFilters }: TownFilterProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const {openDialog, closeDialog, townFilters, setTownFilters} = useUIStore();

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={2}
        alignItems="center"
        my={2}
      >
        <TextField
          label="Search by Name"
          value={townFilters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          fullWidth
          margin="normal"
        />

        <SelectInput
          label="Size"
          value={townFilters.size}
          onChange={(e) => setFilters({ size: e.target.value })}
          options={toSelectOptions(SIZE_TYPES)}
        />

        <SelectInput
          label="Climate"
          value={townFilters.climate}
          onChange={(e) => setFilters({ climate: e.target.value })}
          options={toSelectOptions(CLIMATE_TYPES)}
        />
        {/*
        <SelectInput
          label="Tags"
          value={townFilters.tags}
          onChange={(e) => setFilters({ tags: e.target.value })}
          options={toSelectOptions(TAG_OPTIONS)}
          placeholder="Select tags"
        />
        */}
        {!isDesktop && (
          <IconButton onClick={() => useUIStore.getState().setOpenDialog('locationTypeDialog') } color="primary">
            <FilterListIcon />
          </IconButton>
        )}
      </Box>
        {/*
      <TownFilterDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
      */}
    </>
  );
}
