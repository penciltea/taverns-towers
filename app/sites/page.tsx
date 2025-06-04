'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '@/store/uiStore';
import { SiteType } from '@/interfaces/site.interface';
import { usePaginatedSites } from '@/hooks/site.query';
import FilteredGridView from "@/components/Grid/FilteredGridView";
import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { SiteFilters } from "@/interfaces/site.interface";
import GridItem from "@/components/Grid/GridItem";
import { DefaultSiteFilters } from "@/interfaces/site.interface";
import FilterBar from "@/components/Grid/FilterBar";
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { deleteSite } from '@/lib/actions/site.actions';
import { siteListKey } from '@/lib/util/queryKeys';

export default function AllSitesPage(){
    const { closeDialog } = useUIStore();
    const [ selected, setSelected ] = useState<SiteType | null>(null);
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState<SiteFilters>({
        ...DefaultSiteFilters
    });

    const { data } = usePaginatedSites(
        filters.settlementId,
        filters.page,
        filters.limit,
        filters.search,        
        filters.type,
    );
    
    const sites = data?.sites || [];
    const totalCount = data?.total || 0;

    async function handleDeleteSite(id: string) {
    try {
        await deleteSite(id);

        // Use the same key generator to invalidate the right query
        queryClient.invalidateQueries({
        queryKey: siteListKey(
            filters.settlementId ?? 'all',
            filters.page,
            filters.limit,
            filters.search,
            filters.type
        ),
        });

        closeDialog(); // optional: close dialog after delete
    } catch (error) {
        console.error("Error deleting site:", error);
    }
    }
    
    return (
        <>
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
                        useUIStore.getState().setOpenDialog('SiteDetailsDialog', { siteData: site, onDelete: () => handleDeleteSite(site._id)});
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
                        setFilters({ ...DefaultSiteFilters }); // reset to default
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
        </>
    );
}