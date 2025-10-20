"use client";

import { Box, Button, Stack, SelectChangeEvent } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ContentFilters } from "@/store/contentStore";
import SelectInput from "@/components/Common/SelectInput";
import SearchInput from "./SearchInput";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { pageSizeOptions } from "@/constants/common.options";
import { ChipFilterConfig, ChipFilters} from "./ChipFilters";


interface FilterBarProps {
    filters: ContentFilters;
    setFilters: (filters: ContentFilters) => void;
    clearFilters: () => void;
    children?: React.ReactNode; // for custom filter fields like size, climate, etc.
    onOpenAdvanced?: () => void;
    chipFilters?: ChipFilterConfig[];
}

export default function FilterBar({
  filters,
  setFilters,
  clearFilters,
  children,
  onOpenAdvanced,
  chipFilters
}: FilterBarProps) {
  const isMobile = useIsMobile();

  console.log("filters: ", filters);

  // Handle search changes at the FilterBar level
  const handleSearchChange = (searchValue: string) => {
    const updatedFilters = { ...filters, search: searchValue };
    setFilters(updatedFilters);
  };

  // Handle page size change
  const handlePageSizeChange = (event: SelectChangeEvent<string>) => {
    const updatedFilters = { ...filters, limit: parseInt(event.target.value, 10), page: 1 };
    setFilters(updatedFilters);
  };

  // Clear search input and reset filters
  const handleClearFilters = () => {
    setFilters({ ...filters, search: "" });
    clearFilters();
  };

  const renderFilterContent = (layout: "mobile" | "desktop") => {
    const isMobile = layout === "mobile";
    const Layout = isMobile ? Stack : Box;
    const layoutProps = isMobile
      ? { direction: "column" as const }
      : {
        display: "grid",
        gap: 2,
        justifyItems: "flex-start",
        alignItems: "center",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "350px 250px 150px auto",
        }
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
            color="secondary"
            sx={isMobile ? { my: 2 } : undefined}
          >
            {isMobile ? "Filters" : "Advanced"}
          </Button>
        )}

        {chipFilters?.map(({ title, key, options }) => (
          <Box
            key={key as string}
            sx={{
              gridColumn: '1 / -1',
              width: '100%',
            }}
          >
            <ChipFilters
              title={title}
              options={options}
              selected={(filters[key] ?? []) as string[]}
              onChange={(updated) =>
                setFilters({
                  ...filters,
                  [key]: updated,
                  page: 1,
                })
              }
            />
          </Box>
        ))}

        <Button
          variant="text"
          size="small"
          color="secondary"
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
