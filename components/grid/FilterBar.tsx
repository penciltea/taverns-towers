"use client";

import { Box, Button, TextField, Stack, MenuItem, SelectChangeEvent } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ContentFilters } from "@/store/contentStore";
import SelectInput from "@/components/Common/SelectInput";
import SearchInput from "./SearchInput";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { pageSizeOptions } from "@/constants/commonOptions";


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

  const renderFilterContent = (layout: "mobile" | "desktop") => {
    const isMobile = layout === "mobile";
    const Layout = isMobile ? Stack : Box;
    const layoutProps = isMobile
      ? { direction: "column" as const }
      : {
          display: "grid",
          gridTemplateColumns: "350px 250px 150px auto",
          gridTemplateRows: "3",
          gap: 2,
          justifyItems: "flex-start",
          alignItems: "center",
        };

    return (
      <Layout {...layoutProps}>
        <SearchInput
          value={filters.search}
          onSearchChange={handleSearchChange}
          clearSearch={() => setFilters({ ...filters, search: "" })}
        />

        {children}

        <SelectInput
          label="Items per page"
          value={filters.limit.toString()}
          onChange={handlePageSizeChange}
          options={toSelectOptions(pageSizeOptions)}
        />

        {onOpenAdvanced && (
          <Button
            variant="contained"
            size="large"
            startIcon={<TuneIcon />}
            onClick={onOpenAdvanced}
            color="primary"
            sx={isMobile ? { my: 2 } : undefined}
          >
            {isMobile ? "Filters" : "Advanced"}
          </Button>
        )}

        <Button
          variant="text"
          size="small"
          sx={{
            textDecoration: "underline",
            ...(isMobile
              ? { my: 1 }
              : {
                  justifySelf: "center",
                  gridColumn: "1 / -1",
                  gridRow: 3,
                }),
          }}
          onClick={handleClearFilters}
        >
          Reset All
        </Button>
      </Layout>
    );
  };


  return isMobile ? renderFilterContent("mobile") : renderFilterContent("desktop");
}
