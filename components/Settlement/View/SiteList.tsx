'use client'

import { useState } from "react";
import { Typography } from "@mui/material";
import { SiteListProps, SiteQueryParams, SiteType, DefaultSiteQueryParams } from "@/interfaces/site.interface";
import { useUIStore } from "@/store/uiStore";
import { useSitesBySettlementQuery } from "@/hooks/site/site.query";
import FilteredGridView from "@/components/Grid/FilteredGridView";
import GridItem from "@/components/Grid/GridItem";
import FilterBar from "@/components/Grid/FilterBar";
import { SITE_CATEGORIES } from "@/constants/site/site.options";
import { queryClient } from "@/components/Layout/QueryProviderWrapper";
import { handleSiteLabel } from "@/lib/util/siteHelpers";
import { getPlaceholderSite } from "@/lib/util/getPlaceholders";
import { invalidateSiteQueries } from "@/lib/util/invalidateQuery";

export default function SiteList({ settlementId }: SiteListProps) {
  const { setOpenDialog, closeDialog, showErrorDialog } = useUIStore();

  const [filters, setFilters] = useState<SiteQueryParams>({
    ...DefaultSiteQueryParams,
    settlementId,
  });

  const { data } = useSitesBySettlementQuery(
    settlementId,
    {
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      types: filters.types,
      tone: filters.tone,
      favorite: filters.favorite,
    },
    { isEnabled: !!settlementId }
  );

  async function handleDeleteSite(id: string) {
    try {
      const { deleteSite } = await import("@/lib/actions/site.actions");
      await deleteSite(id);

      // Invalidate queries for this settlement
      invalidateSiteQueries(queryClient, id, settlementId);
      
      closeDialog();
    } catch (error) {
      showErrorDialog(
        'There was a problem deleting the site, please try again later'
      );
      console.error('Error deleting site:', error);
    }
  }

  if (!settlementId) {
    return <Typography color="error">Invalid settlement ID</Typography>;
  }

  const sites = data?.sites || [];
  const totalCount = data?.total || 0;

  return (
    <FilteredGridView<SiteType>
      title="Sites"
      titleVariant="h4"
      titleComponent="h4"
      description="Sites are the landmarks within your settlements: the taverns, temples, guild halls, and shadowy hideouts that give each place its charm (or danger). Think of them as the stage sets where your stories come alive."
      content="sites"
      searchVariant="h5"
      searchComponent="h5"
      countVariant="h6"
      countComponent="h6"
      items={sites}
      emptyText="This settlement doesn&apos;t have any sites yet. Add one to bring it to life; even the smallest village has a gathering spot or two."
      renderItem={(site) => (
        <GridItem
          key={site._id}
          title={site.name}
          image={site.image ?? getPlaceholderSite(site.type)}
          subtitle={handleSiteLabel(site)}
          onClick={() => {
            setOpenDialog('SiteDetailsDialog', {  
              siteData: site, 
              settlementId,
              onDelete: () => handleDeleteSite(site._id),
            });
          }}
        />
      )}
      filterComponent={
        <FilterBar
          filters={filters}
          setFilters={(newFilters) =>
            setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
          }
          clearFilters={() => setFilters({ ...DefaultSiteQueryParams, settlementId })}
          chipFilters={[
            {
              title: "Filter by Category",
              key: "type",
              options: SITE_CATEGORIES,
            },
          ]}
        />
      }
      currentPage={filters.page}
      onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage }))}
      totalCount={totalCount}
      pageSize={filters.limit}
    />
  );
}
