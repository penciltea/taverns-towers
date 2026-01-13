'use client';


import { useState } from 'react';
import { canCreate } from '@/lib/auth/authPermissions';
import AuthGate from '@/components/Auth/AuthGuard';
import { useCampaignPermissionsQuery } from '@/hooks/campaign/campaign.query';
import { useCampaignStore } from '@/store/campaignStore';
import { useSitesBySettlementQuery } from '@/hooks/site/site.query';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import Typography from '@mui/material/Typography';
import GridItem from '@/components/Grid/GridItem';
import { SiteQueryParams, DefaultSiteQueryParams, SiteType } from '@/interfaces/site.interface';
import { useUIStore } from '@/store/uiStore';
import FilterBar from '@/components/Grid/FilterBar';
import { SITE_CATEGORIES } from '@/constants/site/site.options';
import { handleSiteLabel } from '@/lib/util/siteHelpers';
import { queryClient } from '@/components/Layout/QueryProviderWrapper';
import { getPlaceholderSite } from '@/lib/util/getPlaceholders';
import { invalidateSiteQueries } from '@/lib/util/invalidateQuery';

export default function WildernessPage() {
    const settlementId = 'wilderness';
    const { selectedCampaign } = useCampaignStore();
    const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);
      

    const { setOpenDialog, closeDialog, showErrorDialog } = useUIStore();
        const [filters, setFilters] = useState<SiteQueryParams>({
        ...DefaultSiteQueryParams,
        settlementId
    });

    // Only enable query if user is logged in
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
    
          invalidateSiteQueries(queryClient, settlementId, selectedCampaign?._id);
    
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

    function handleContentTitle(){
        if( data?.sites && data?.sites.length > 1 ){
            return "Sites"
        } else {
            return "Site"
        }
    }

  function handlePageTitle(){
    if(selectedCampaign){
      return `The Wilderness for ${selectedCampaign.name}`
    } else {
      return "The Wilderness"
    }
  }

    function handleFabPermissions(){
      if(selectedCampaign && canCreate(campaignPermissions ?? undefined)){
        return true
      }
      return false;
    }

    return (
        <AuthGate fallbackText="You must be logged in to view your wilderness data.">
            <FilteredGridView<SiteType>
                title={handlePageTitle().toString()}
                titleVariant="h4"
                titleComponent="h4"
                description="The wilderness is the vast canvas between towns and cities. It&apos;s the stretch of land where adventurers wander, stories unfold, and danger lingers. From lone shrines to mysterious caves, these sites help bring your world&apos;s wild places to life."
                content={handleContentTitle().toString()}
                searchVariant="h5"
                searchComponent="h5"
                countVariant="h6"
                countComponent="h6"
                items={sites}
                emptyText="The wilderness is pretty empty currently. Add a site to bring it to life; even the smallest village has a gathering spot or two."
                renderItem={(site) => (
                    <GridItem
                        key={site._id}
                        title={site.name}
                        image={site.image ?? getPlaceholderSite(site.type)}
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
                        setFilters={(newFilters) => {
                                setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
                            }
                        }
                        clearFilters={() => {
                            setFilters({ ...DefaultSiteQueryParams, settlementId }); // reset to default + settlement
                        }}
                        chipFilters={[
                            {
                            title: "Filter by Category",
                            key: "types",
                            options: SITE_CATEGORIES,
                            },
                        ]}
                    > </FilterBar>
                }
                currentPage={filters.page}
                onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage }))}
                totalCount={totalCount}
                pageSize={filters.limit}
                fabLabel="Add Site"
                fabOnClick={() => setOpenDialog('siteTypeDialog', { 
                    dialogMode: 'direct', 
                    settlementId, 
                })}
                fabPermissions={handleFabPermissions}
            />
        </AuthGate>
    );
}
