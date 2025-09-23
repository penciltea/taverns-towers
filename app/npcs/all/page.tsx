'use client';

import NpcFilters from '@/components/Npc/View/NpcFilter';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import GridItem from '@/components/Grid/GridItem';
import { useOwnedNpcsQuery } from '@/hooks/npc/npc.query';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { DefaultNpcQueryParams, NpcQueryParams } from '@/interfaces/npc.interface';
import { Spinner } from '@/components/Common/Spinner';
import { useAuthStore } from '@/store/authStore';
import AuthGate from '@/components/Auth/AuthGuard';
import { toTitleCase } from '@/lib/util/stringFormats';

export default function NpcsPage() {
  const defaultImage = '/placeholders/town.png';
  const user = useAuthStore(state => state.user);

  const [params, setParams] = useState<NpcQueryParams>({
    ...DefaultNpcQueryParams
  });

  // Set initial params after user loads
  useEffect(() => {
    if (user) {
      setParams({ ...DefaultNpcQueryParams });
    }
  }, [user]);

  // Prevent query call until params are ready
  const { data, isLoading, error } = useOwnedNpcsQuery(params!, {
    isEnabled: !!params
  });

  return (
    <AuthGate fallbackText="You must be logged in to view your NPCs.">
      {!params || isLoading ? (
        <Spinner />
      ) : error || !data?.success ? (
        <Typography>Looks like your world is still a bit quiet. Create an NPC to populate your story — every bustling market or haunted forest needs someone to talk to (or run from).</Typography>
      ) : (
        <FilteredGridView
          title="My NPCs"
          titleVariant="h3"
          titleComponent="h1"
          description="NPCs are the personalities that inhabit your world. From eccentric shopkeepers and wandering sages to rival adventurers, they bring voice, drama, and surprise to every encounter."
          content="NPCs"
          searchVariant="h4"
          searchComponent="h2"
          countVariant="subtitle1"
          countComponent="h3"
          items={data.npcs}
          renderItem={(npc) => (
            <GridItem
              key={npc._id}
              link={`/npcs/${npc._id}`}
              title={npc.name}
              subtitle={`Race: ${toTitleCase(npc.race ?? 'N/A') || 'N/A'}`}
              image={npc.image || defaultImage}
            />
          )}
          filterComponent={
            <NpcFilters
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
          fabLabel="Add NPC"
          fabLink="/npcs/new"
        />
      )}
    </AuthGate>
  );
}
