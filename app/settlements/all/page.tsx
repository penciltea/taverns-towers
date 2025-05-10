'use client';

import SettlementFilters from '@/components/Settlement/View/SettlementFilter';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import { useSettlementsQuery } from '@/hooks/settlement.query';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { DefaultSettlementQueryParams } from '@/interfaces/settlement.interface';
import GridItem from '@/components/Grid/GridItem';

export default function SettlementsPage() {
  const defaultImage = '/placeholders/town.png';
  const [params, setParams] = useState(DefaultSettlementQueryParams);

  const { data, isLoading, isError } = useSettlementsQuery(params);

  if (isLoading) return <Typography>Loading settlements...</Typography>;
  if (isError || !data?.success) return <Typography>Failed to load settlements.</Typography>;

  return (
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
            setParams((prev) => ({ ...prev, ...newFilters, page: 1 }))
          }
        />
      }
      currentPage={params.page}
      onPageChange={(newPage) =>
        setParams((prev) => ({ ...prev, page: newPage }))
      }
      totalCount={data.total}
      pageSize={params.limit}
      fabLabel="Add Settlement"
      fabLink="/settlements/new"
    />
  );
}
