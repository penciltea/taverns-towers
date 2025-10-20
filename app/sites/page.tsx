'use client';

import { useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { SiteType } from '@/interfaces/site.interface';
import { useOwnedSitesQuery } from '@/hooks/site/site.query';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import { SITE_CATEGORIES } from '@/constants/site/site.options';
import { SiteQueryParams } from '@/interfaces/site.interface';
import GridItem from '@/components/Grid/GridItem';
import { DefaultSiteQueryParams } from '@/interfaces/site.interface';
import FilterBar from '@/components/Grid/FilterBar';
import AuthGate from '@/components/Auth/AuthGuard';
import { handleSiteLabel } from '@/lib/util/siteHelpers';
import { Spinner } from '@/components/Common/Spinner';
import Typography from '@mui/material/Typography';
import { useAuthStore } from '@/store/authStore';

export default function AllSitesPage() {
  const { setOpenDialog } = useUIStore();

  const user = useAuthStore(state => state.user);
  
  const [filters, setFilters] = useState<SiteQueryParams>({
    ...DefaultSiteQueryParams,
  });

  // Query using filters
  const { data, isLoading, error } = useOwnedSitesQuery(filters, {
    isEnabled: !!user,
  });
  
  return (
    <AuthGate fallbackText="You must be logged in to view your sites.">
      {isLoading ? (
        <Spinner />
      ) : error || !data?.success ? (
        <Typography>It looks like you haven&apos;t forged any settlements yet. Start by creating one to lay the foundation for your world; every great story begins with a town square (or a back-alley tavern).</Typography>
      ) : (
        <FilteredGridView<SiteType>
          title="Sites"
          titleVariant="h4"
          titleComponent="h4"
          description="Here you&apos;ll find every site you&apos;ve crafted: inns, shrines, guildhalls, and mysterious caverns alike, which can be found across your library of settlements."
          content="sites"
          searchVariant="h5"
          searchComponent="h5"
          countVariant="h6"
          countComponent="h6"
          items={data.sites}
          renderItem={(site: SiteType) => (
            <GridItem
              key={site._id}
              title={site.name}
              image={site.image}
              subtitle={handleSiteLabel(site)}
              tone={site.tone}
              link={`/sites/${site._id}`}
            />
          )}
          filterComponent={
            <FilterBar
              filters={filters}
              setFilters={(newFilters) =>
                setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
              }
              clearFilters={() => setFilters({ ...DefaultSiteQueryParams })}
              chipFilters={[
                {
                  title: 'Filter by Category',
                  key: 'types',
                  options: SITE_CATEGORIES,
                },
              ]}
            />
          }
          currentPage={filters.page}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
          totalCount={data.total}
          pageSize={filters.limit}
          fabLabel="Add Site"
          fabOnClick={() =>
            setOpenDialog('siteTypeDialog', { dialogMode: 'global' })
          }
        />
      )}
    </AuthGate>
  );
}
