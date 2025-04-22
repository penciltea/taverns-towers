"use client";
import { SelectChangeEvent } from "@mui/material";
import { Box, IconButton, TextField, useMediaQuery, useTheme } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SelectInput from "@/components/Common/SelectInput";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { CLIMATE_TYPES, SIZE_TYPES } from "@/constants/townOptions";
import { useTownContentStore } from "@/store/townStore";
import { Town } from "@/interfaces/town.interface";
import { ContentFilters } from "@/store/contentStore";

const townFilterFn = (item: Town, filters: ContentFilters): boolean => {
  const matchesSearch =
    !filters.search || item.name?.toLowerCase().includes(filters.search.toLowerCase());

  const matchesSize =
    !filters.size || item.size === filters.size;

  const matchesClimate =
    !filters.climate || item.climate === filters.climate;

  const matchesTags =
    !filters.tags || filters.tags.every((tag: string) => item.tags?.includes(tag));

  return matchesSearch && matchesSize && matchesClimate && matchesTags;
};

export default function TownFilters() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  
  // Access the store
  const { filters, applyFilters } = useTownContentStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters, search: e.target.value };
    applyFilters(updatedFilters, townFilterFn);
  };

  const handleSelectChange = (key: string) => (e: SelectChangeEvent<string>) => {
    const updatedFilters = { ...filters, [key]: e.target.value };
    applyFilters(updatedFilters, townFilterFn);
  };  

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={2}
      alignItems="center"
      my={2}
    >
      {/* Search Field */}
      <TextField
        label="Search by Name"
        value={filters.search || ""}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />

      {/* Size Filter */}
      <SelectInput
        label="Size"
        value={filters.size || ""}
        onChange={handleSelectChange("size")}
        options={toSelectOptions(SIZE_TYPES)}
      />

      {/* Climate Filter */}
      <SelectInput
        label="Climate"
        value={filters.climate || ""}
        onChange={handleSelectChange("climate")}
        options={toSelectOptions(CLIMATE_TYPES)}
      />

      {/* Mobile Filter Icon */}
      {!isDesktop && (
        <IconButton onClick={() => { /* Handle filter dialog open if needed */ }} color="primary">
          <FilterListIcon />
        </IconButton>
      )}
    </Box>
  );
}
