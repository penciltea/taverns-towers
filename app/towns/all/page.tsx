'use client';

import TownFilters from '@/components/Town/View/TownFilter';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import { useTownsQuery } from '@/hooks/town.query';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { DefaultTownQueryParams } from '@/interfaces/town.interface';

export default function TownsPage() {
  const defaultImage = "/placeholders/town.png";
  const [params, setParams] = useState(DefaultTownQueryParams);

  const { data, isLoading, isError } = useTownsQuery(params);

  if (isLoading) return <Typography>Loading towns...</Typography>;
  if (isError || !data?.success) return <Typography>Failed to load towns.</Typography>;

  const fields = data.towns.map((town) => ({
    link: `/towns/${town._id}`,
    title: town.name,
    subtitle: `Size: ${town.size || 'N/A'}`,
    image: town.map || defaultImage,
    tags: town.tags,
  }));

  return (
    <FilteredGridView
      title="My Towns"
      content="towns"
      filterComponent={
        <TownFilters
          filters={params}
          setFilters={(newFilters) => setParams((prev) => ({ ...prev, ...newFilters, page: 1 }))}
        />
      }
      initialItems={data.towns}
      fields={fields}
      fabLabel="Add Town"
      fabLink="/towns/new"
      
    />
  );
}
