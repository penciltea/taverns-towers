'use client';

import { queryClient } from '@/components/Layout/QueryProviderWrapper';
import { getOwnedSettlements } from '@/lib/actions/settlement.actions';
import { getOwnedSites } from '@/lib/actions/site.actions';
import { getOwnedNpcs } from '@/lib/actions/npc.actions';

export async function prefetchUserData() {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['ownedSettlements', {}],
      queryFn: () => getOwnedSettlements({}),
    }),
    queryClient.prefetchQuery({
      queryKey: ['ownedSites', {}],
      queryFn: () => getOwnedSites({}),
    }),
    queryClient.prefetchQuery({
      queryKey: ['ownedNpcs', {}],
      queryFn: () => getOwnedNpcs({}),
    }),
  ]);
}