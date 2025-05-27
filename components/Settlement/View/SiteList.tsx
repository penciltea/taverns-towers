'use client'

import { useState } from "react";
import { Typography } from "@mui/material";
import { SiteListProps } from "@/interfaces/site.interface";
import { useUIStore } from "@/store/uiStore";
import { SiteType } from '@/interfaces/site.interface';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { usePaginatedSites } from "@/hooks/site.query";
import SiteDetailsDialog from "@/components/Site/Dialog/SiteDetailsDialog";
import FilteredGridView from "@/components/Grid/FilteredGridView";
import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { SiteFilters } from "@/interfaces/site.interface";
import GridItem from "@/components/Grid/GridItem";
import { DefaultSiteFilters } from "@/interfaces/site.interface";
import FilterBar from "@/components/Grid/FilterBar";

export default function SiteList({ settlementId, onDelete }: SiteListProps) {
  if (!settlementId) {
    return <Typography color="error">Invalid settlement ID</Typography>;
  }

  const { setOpenDialog } = useUIStore();
  const [selected, setSelected] = useState<SiteType | null>(null);

  const [filters, setFilters] = useState<SiteFilters>({
    ...DefaultSiteFilters,
    settlementId,
  });

  const { data } = usePaginatedSites(
    filters.settlementId,
    filters.page,
    filters.limit,
    filters.type,
    filters.search
  );
  
  const sites = data?.sites || [];
  const totalCount = data?.total || 0;
  
  return (
    <FilteredGridView<SiteType>
      title="Sites"
      titleVariant="h4"
      titleComponent="h4"
      content="sites"
      searchVariant="h5"
      searchComponent="h5"
      countVariant="h6"
      countComponent="h6"
      items={sites}
      renderItem={(site) => (
        <GridItem
          key={site._id}
          title={site.name}
          image={site.image}
          subtitle={getLabelFromValue(SITE_CATEGORIES, site.type)}
          onClick={() => {
            setSelected(site);
            setOpenDialog('SiteDetailsDialog', {  siteData: selected, settlementId: settlementId, onDelete: onDelete })
          }}
        />
      )}
      filterComponent={
        <FilterBar
          filters={filters}
          setFilters={(newFilters) =>
            setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
          }
          clearFilters={() => {
            setFilters({ ...DefaultSiteFilters, settlementId }); // reset to default + settlement
          }}
          chipFilters={[
            {
              title: "Filter by Category",
              key: "type",
              options: SITE_CATEGORIES,
            },
          ]}
        > </FilterBar>
      }
      currentPage={filters.page}
      onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage }))}
      totalCount={totalCount}
      pageSize={filters.limit}
    />
  );
}
