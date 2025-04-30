"use client";

import { Box, Button, TextField, Stack } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ContentFilters } from "@/store/contentStore";
import { useState } from "react";

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

  // Temporarily store the search input
  const [searchInput, setSearchInput] = useState(filters.search || "");

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value); // Update the search input value but do not trigger the API call
  };

  // Trigger search on pressing Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const updatedFilters = { ...filters, search: searchInput };
      setFilters(updatedFilters); // Trigger the search when "Enter" is pressed
    }
  };

  // For mobile, use `onKeyUp` to capture "Enter" as well
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const updatedFilters = { ...filters, search: searchInput };
      setFilters(updatedFilters); // Trigger the search when "Enter" is pressed
    }
  };

  // Clear search input and reset filters
  const handleClearFilters = () => {
    setSearchInput(""); // Clear the search input field
    clearFilters(); // Call the passed-in clearFilters function to reset other filters
  };

  return isMobile ? (
    <Stack direction="column">
      <TextField
        label="Search by Name"
        value={searchInput}
        onChange={handleSearchChange} // Update value on change, but doesn't trigger search
        onKeyUp={handleKeyUp} // Trigger search on Enter key press (works for mobile)
        fullWidth
        margin="normal"
        sx={{ my: 2 }}
      />

      {children}
      
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
      gridTemplateColumns="350px 250px auto"
      gridTemplateRows="2"
      gap={2}
      justifyItems="flex-start"
      alignItems="center"
    >
      <TextField
        label="Search by Name"
        value={searchInput}
        onChange={handleSearchChange} // Update value on change, but doesn't trigger search
        onKeyDown={handleKeyDown} // Trigger search on Enter key press (works for desktop)
        fullWidth
        margin="normal"
      />

      {children}

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
