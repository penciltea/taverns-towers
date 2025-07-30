'use client';

import SettlementFilters from '@/components/Settlement/View/SettlementFilter';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import { useOwnedSettlementsQuery } from '@/hooks/settlement.query';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { DefaultSettlementQueryParams, SettlementQueryParams } from '@/interfaces/settlement.interface';
import GridItem from '@/components/Grid/GridItem';
import { Spinner } from '@/components/Common/Spinner';
import { useAuthStore } from '@/store/authStore';
import AuthGate from '@/components/Auth/AuthGuard';

export default function SettlementsPage() {
  const defaultImage = '/placeholders/town.png';
  const user = useAuthStore(state => state.user);

  const [params, setParams] = useState<SettlementQueryParams | null>(null); // Temporarily allow null

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

  return (
    <AuthGate fallbackText="You must be logged in to view your settlements.">
      {!params || isLoading ? (
        <Spinner />
      ) : error || !data?.success ? (
        <Typography>Failed to load settlements.</Typography>
      ) : (
        <FilteredGridView
          title="My Settlements"
          titleVariant="h3"
          titleComponent="h1"
          content="settlements"
          searchVariant="h4"
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
