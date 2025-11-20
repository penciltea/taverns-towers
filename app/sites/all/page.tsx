'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { useCampaignStore } from '@/store/campaignStore';
import { useOwnedSitesQuery } from '@/hooks/site/site.query';
import { canCreate } from '@/lib/auth/authPermissions';
import { useCampaignPermissionsQuery } from '@/hooks/campaign/campaign.query';
import AuthGate from '@/components/Auth/AuthGuard';
import { SiteType } from '@/interfaces/site.interface';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import { SITE_CATEGORIES } from '@/constants/site/site.options';
import { SiteQueryParams } from '@/interfaces/site.interface';
import GridItem from '@/components/Grid/GridItem';
import { DefaultSiteQueryParams } from '@/interfaces/site.interface';
import FilterBar from '@/components/Grid/FilterBar';
import { handleSiteLabel } from '@/lib/util/siteHelpers';
import { Spinner } from '@/components/Common/Spinner';
import Typography from '@mui/material/Typography';
import { getPlaceholderSite } from '@/lib/util/getPlaceholders';

export default function AllSitesPage() {
  const user = useAuthStore(state => state.user);
  const { setOpenDialog } = useUIStore();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);
  
  const [filters, setFilters] = useState<SiteQueryParams>({
    ...DefaultSiteQueryParams,
  });

  // Set initial params after user loads
  useEffect(() => {
    if (user) {
      setFilters({ ...DefaultSiteQueryParams });
    }
  }, [user]);

  // Prevent query call until params are ready
  const { data, isLoading, error } = useOwnedSitesQuery(filters!, {
    isEnabled: !!user,
  });

  function handleContentTitle(){
    if( data?.sites && data?.sites.length > 1 ){
      return "Sites"
    } else {
      return "Site"
    }
  }

  function handlePageTitle(){
    if(selectedCampaign){
      return `My Sites for ${selectedCampaign.name}`
    } else {
      return "My Sites"
    }
  }

  function handleFabPermissions(){
    if(selectedCampaign && canCreate(campaignPermissions ?? undefined)){
      return true
    }
    return false;
  }
  
  return (
    <AuthGate fallbackText="You must be logged in to view your sites.">
      {isLoading ? (
        <Spinner />
      ) : error || !data?.sites ? (
        <Typography>It looks like you haven&apos;t forged any settlements yet. Start by creating one to lay the foundation for your world; every great story begins with a town square (or a back-alley tavern).</Typography>
      ) : (
        <FilteredGridView<SiteType>
          title={handlePageTitle().toString()}
          titleVariant="h4"
          titleComponent="h4"
          description="Here you&apos;ll find every site you&apos;ve crafted: inns, shrines, guildhalls, and mysterious caverns alike, which can be found across your library of settlements."
          content={handleContentTitle().toString()}
          searchVariant="h5"
          searchComponent="h5"
          countVariant="h6"
          countComponent="h6"
          items={data.sites}
          renderItem={(site: SiteType) => (
            <GridItem
              key={site._id}
              title={site.name}
              image={site.image ?? getPlaceholderSite(site.type)}
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
          fabPermissions={handleFabPermissions}
        />
      )}
    </AuthGate>
  );
}
