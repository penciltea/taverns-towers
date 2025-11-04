'use client';

import SettlementFilters from '@/components/Settlement/View/SettlementFilter';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import { useOwnedSettlementsQuery } from '@/hooks/settlement/settlement.query';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { DefaultSettlementQueryParams, SettlementQueryParams } from '@/interfaces/settlement.interface';
import GridItem from '@/components/Grid/GridItem';
import { Spinner } from '@/components/Common/Spinner';
import { useAuthStore } from '@/store/authStore';
import AuthGate from '@/components/Auth/AuthGuard';
import { useCampaignStore } from '@/store/campaignStore';

export default function SettlementsPage() {
  const defaultImage = '/placeholders/town.png';
  const user = useAuthStore(state => state.user);
  const { selectedCampaign } = useCampaignStore();

  const [params, setParams] = useState<SettlementQueryParams>({
    ...DefaultSettlementQueryParams
  });

  // Set initial params after user loads
  useEffect(() => {
    if (user) {
      setParams({ ...DefaultSettlementQueryParams });
    }
  }, [user]);

  // Prevent query call until params are ready
  const { data, isLoading, error } = useOwnedSettlementsQuery(params!, {
    isEnabled: !!params
  });

  function handleContentTitle(){
    if( data?.settlements && data?.settlements.length > 1 ){
      return "Settlements"
    } else {
      return "Settlement"
    }
  }

  function handlePageTitle(){
    if(selectedCampaign){
      return `My Settlements for ${selectedCampaign.name}`
    } else {
      return "My Settlements"
    }
  }

  return (
    <AuthGate fallbackText="You must be logged in to view your settlements.">
      {!params || isLoading ? (
        <Spinner />
      ) : error || !data?.success ? (
        <Typography>It looks like you haven&apos;t forged any settlements yet. Start by creating one to lay the foundation for your world; every great story begins with a town square (or a back-alley tavern).</Typography>
      ) : (
        <FilteredGridView
          title={handlePageTitle().toString()}
          titleVariant="h3"
          titleComponent="h1"
          description="Settlements are the beating hearts of your world. From bustling cities to sleepy villages tucked between hills, they&apos;re the places where adventurers trade stories, meet allies, and stir up a little trouble."
          content={handleContentTitle().toString()}
          searchVariant="h5"
          searchComponent="h2"
          countVariant="subtitle1"
          countComponent="h3"
          items={data.settlements}
          renderItem={(settlement) => (
            <GridItem
              key={settlement._id}
              link={`/settlements/${settlement._id}`}
              title={settlement.name}
              subtitle={`Size: ${settlement.size || 'N/A'}`}
              image={settlement.map || defaultImage}
              tags={settlement.tags}
              tone={settlement.tone}
            />
          )}
          filterComponent={
            <SettlementFilters
              filters={params}
              setFilters={(newFilters) =>
                setParams((prev) => ({ ...prev!, ...newFilters, page: 1 }))
              }
            />
          }
          currentPage={params.page}
          onPageChange={(newPage) =>
            setParams((prev) => ({ ...prev!, page: newPage }))
          }
          totalCount={data.total}
          pageSize={params.limit}
          fabLabel="Add Settlement"
          fabLink="/settlements/new"
        />
      )}
    </AuthGate>
  );
}
