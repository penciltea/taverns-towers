"use client";

import { Box, Button, TextField, Stack, MenuItem, SelectChangeEvent } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ContentFilters } from "@/store/contentStore";
import SelectInput from "@/components/Common/SelectInput";
import SearchInput from "./SearchInput";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";


interface FilterBarProps<T> {
    filters: ContentFilters;
    setFilters: (filters: ContentFilters) => void;
    clearFilters: () => void;
    children?: React.ReactNode; // for custom filter fields like size, climate, etc.
    onOpenAdvanced?: () => void;
}

export default function FilterBar<T>({
  filters,
  setFilters,
  clearFilters,
  children,
  onOpenAdvanced,
}: FilterBarProps<T>) {
  const isMobile = useIsMobile();

  // Handle search changes at the FilterBar level
  const handleSearchChange = (searchValue: string) => {
    const updatedFilters = { ...filters, search: searchValue };
    setFilters(updatedFilters);
  };

  // Handle page size change
  const handlePageSizeChange = (event: SelectChangeEvent<string>) => {
    const updatedFilters = { ...filters, limit: parseInt(event.target.value, 12), page: 1 };
    setFilters(updatedFilters);
  };

  // Clear search input and reset filters
  const handleClearFilters = () => {
    setFilters({ ...filters, search: "" }); // Clear the search field in the filters
    clearFilters(); // Reset other filters to their default state
  };

  const pageSizeOptions = [
    { value: "12", label: "12" },
    { value: "24", label: "24" },
    { value: "48", label: "48" },
    { value: "96", label: "96" },
  ];


  return isMobile ? (
    <Stack direction="column">
      <SearchInput value={filters.search} onSearchChange={handleSearchChange} clearSearch={() => setFilters({ ...filters, search: "" })} />

      {children}

      <SelectInput
        label="Items per page"
        value={filters.limit.toString()}
        onChange={handlePageSizeChange}
        options={pageSizeOptions}
      />
      
      {onOpenAdvanced && (
        <Button
          variant="contained"
          size="large"
          startIcon={<TuneIcon />}
          onClick={onOpenAdvanced}
          color="primary"
          sx={{ my: 2 }}
        >
          Filters
        </Button>
      )}

      <Button
        variant="text"
        size="small"
        sx={{ textDecoration: 'underline', my: 1 }}
        onClick={clearFilters} // Reset filters logic will be handled at the parent level
      >
        Reset All
      </Button>
    </Stack>
  ) : (
    <Box
      display="grid"
      gridTemplateColumns="350px 250px 150px auto"
      gridTemplateRows="3"
      gap={2}
      justifyItems="flex-start"
      alignItems="center"
    >
      <SearchInput value={filters.search} onSearchChange={handleSearchChange} clearSearch={() => setFilters({ ...filters, search: "" })} />

      {children}

      <SelectInput
        label="Items per page"
        value={filters.limit != null ? filters.limit.toString() : ""}
        onChange={handlePageSizeChange}
        options={pageSizeOptions}
      />

      {onOpenAdvanced && (
        <Button
          variant="contained"
          size="large"
          startIcon={<TuneIcon />}
          onClick={onOpenAdvanced}
          color="primary"
        >
          Advanced
        </Button>
      )}

      <Button
        variant="text"
        size="small"
        sx={{
          justifySelf: "center",
          gridColumn: "1 / -1", 
          gridRow: 3,
          textDecoration: "underline",
        }}
        onClick={handleClearFilters} // Reset filters logic will be handled at the parent level
      >
        Reset All
      </Button>
    </Box>
  );
}
