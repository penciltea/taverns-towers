"use client";

import { Box, Button, TextField, Stack } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ContentFilters } from "@/store/contentStore";

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters, search: e.target.value };
    setFilters(updatedFilters); // Directly update filters in the parent component
  };

  return isMobile ? (
    <Stack direction="column">
      <TextField
        label="Search by Name"
        value={filters.search || ""}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        sx={{ my: 2 }}
      />
      
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
      gridTemplateColumns="350px 250px auto"
      gridTemplateRows="2"
      gap={2}
      justifyItems="flex-start"
      alignItems="center"
    >
      <TextField
        label="Search by Name"
        value={filters.search || ""}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />

      {children}

      <Button
        variant="contained"
        size="large"
        startIcon={<TuneIcon />}
        onClick={onOpenAdvanced}
        color="primary"
      >
        Advanced
      </Button>

      <Button
        variant="text"
        size="small"
        sx={{
          justifySelf: "center",
          gridColumn: "span 2",
          gridRow: 2,
          textDecoration: "underline",
        }}
        onClick={clearFilters} // Reset filters logic will be handled at the parent level
      >
        Reset All
      </Button>
    </Box>
  );
}
