'use client';

import { queryClient } from '@/components/Layout/QueryProviderWrapper';
import { DefaultSettlementQueryParams } from '@/interfaces/settlement.interface';
import { DefaultSiteQueryParams } from '@/interfaces/site.interface';
import { DefaultNpcQueryParams } from '@/interfaces/npc.interface';

export async function prefetchUserData() {
  const [{ getOwnedSettlements }, { getOwnedSites }, { getOwnedNpcs }] =
    await Promise.all([
      import('@/lib/actions/settlement.actions'),
      import('@/lib/actions/site.actions'),
      import('@/lib/actions/npc.actions'),
    ]);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['ownedSettlements', DefaultSettlementQueryParams],
      queryFn: () => getOwnedSettlements(DefaultSettlementQueryParams),
    }),
    queryClient.prefetchQuery({
      queryKey: ['ownedSites', DefaultSiteQueryParams],
      queryFn: () => getOwnedSites(DefaultSiteQueryParams),
    }),
    queryClient.prefetchQuery({
      queryKey: ['ownedNpcs', DefaultNpcQueryParams],
      queryFn: () => getOwnedNpcs(DefaultNpcQueryParams),
    }),
  ]);
}