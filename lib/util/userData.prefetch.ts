'use client';

import { queryClient } from '@/components/Layout/QueryProviderWrapper';
import { getOwnedSettlements } from '@/lib/actions/settlement.actions';
import { getOwnedSitesPaginated } from '@/lib/actions/site.actions';
import { getOwnedNpcs } from '@/lib/actions/npc.actions';
import { DefaultSettlementQueryParams } from '@/interfaces/settlement.interface';
import { DefaultSiteQueryParams } from '@/interfaces/site.interface';
import { DefaultNpcQueryParams } from '@/interfaces/npc.interface';

export async function prefetchUserData() {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['ownedSettlements', DefaultSettlementQueryParams],
      queryFn: () => getOwnedSettlements(DefaultSettlementQueryParams),
    }),
    queryClient.prefetchQuery({
      queryKey: ['ownedSites', DefaultSiteQueryParams],
      queryFn: () => getOwnedSitesPaginated(DefaultSiteQueryParams),
    }),
    queryClient.prefetchQuery({
      queryKey: ['ownedNpcs', DefaultNpcQueryParams],
      queryFn: () => getOwnedNpcs(DefaultNpcQueryParams),
    }),
  ]);
}