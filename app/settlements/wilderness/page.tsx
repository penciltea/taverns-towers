'use client';

import FilteredGridView from '@/components/Grid/FilteredGridView';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import GridItem from '@/components/Grid/GridItem';
import AuthGate from '@/components/Auth/AuthGuard';
import { usePaginatedSites } from '@/hooks/site/site.query';
import { SiteQueryParams, DefaultSiteQueryParams, SiteType } from '@/interfaces/site.interface';
import { useUIStore } from '@/store/uiStore';
import FilterBar from '@/components/Grid/FilterBar';
import { SITE_CATEGORIES } from '@/constants/site/site.options';
import { handleSiteLabel } from '@/lib/util/siteHelpers';
import { queryClient } from '@/components/Layout/QueryProviderWrapper';

export default function WildernessPage() {
    const settlementId = 'wilderness';

    const { setOpenDialog, closeDialog, showErrorDialog } = useUIStore();
  
    const [ filters, setFilters ] = useState<SiteQueryParams>({
        ...DefaultSiteQueryParams,
        settlementId,
    });

    const { data } = usePaginatedSites(
        filters.settlementId,
        filters.page,
        filters.limit,
        filters.search,
        filters.type,
        filters.tone
    );

    async function handleDeleteSite(id: string) {
        try {
        const { deleteSite } = await import("@/lib/actions/site.actions");
          await deleteSite(id);
    
          queryClient.invalidateQueries({ queryKey: ["sites"] });
    
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
        <AuthGate fallbackText="You must be logged in to view your wilderness data.">
            <FilteredGridView<SiteType>
                title="The Wilderness"
                titleVariant="h4"
                titleComponent="h4"
                description="The wilderness is the vast canvas between towns and cities. It&apos;s the stretch of land where adventurers wander, stories unfold, and danger lingers. From lone shrines to mysterious caves, these sites help bring your world&apos;s wild places to life."
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
                    image={site.image}
                    subtitle={handleSiteLabel(site)}
                    tone={site.tone}
                    onClick={() => {
                        setOpenDialog('SiteDetailsDialog', {  
                        siteData: site, 
                        settlementId: settlementId,
                        onDelete: () => handleDeleteSite(site._id),
                        })
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
                        setFilters({ ...DefaultSiteQueryParams, settlementId }); // reset to default + settlement
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
        </AuthGate>
    );
}
