'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Npc } from '@/interfaces/npc.interface';
import type { getOwnedNpcs, getPublicNpcs, getNpcById, resolveConnectionNames } from '@/lib/actions/npc.actions';
import { useCampaignStore } from '@/store/campaignStore';

// -------------------------
// Types for server functions
// -------------------------
type GetNpcByIdFn = typeof getNpcById;
type GetOwnedNpcsFn = typeof getOwnedNpcs;
type GetPublicNpcsFn = typeof getPublicNpcs;
type ResolveConnectionNamesFn = typeof resolveConnectionNames;

// -------------------------
// Single NPC query
// -------------------------
export function useGetNpcById(id: Parameters<GetNpcByIdFn>[0] | null) {
  return useQuery<Awaited<ReturnType<GetNpcByIdFn>>, Error>({
    queryKey: ['npc', id],
    queryFn: async () => {
      if (!id) throw new Error('No NPC ID provided');
      const { getNpcById } = await import('@/lib/actions/npc.actions');
      return await getNpcById(id);
    },
    enabled: !!id,
  });
}

// -------------------------
// Owned NPCs query
// -------------------------
export function useOwnedNpcsQuery(
  params: Omit<Parameters<GetOwnedNpcsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetOwnedNpcsFn>>, Error> {
  const { selectedCampaign } = useCampaignStore();

  const mergedParams = {
    ...params,
    campaignId: selectedCampaign?._id || undefined,
  };

  return useQuery<Awaited<ReturnType<GetOwnedNpcsFn>>, Error>({
    queryKey: ['ownedNpcs', mergedParams],
    queryFn: async () => {
      const { getOwnedNpcs } = await import('@/lib/actions/npc.actions');
      return await getOwnedNpcs(mergedParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
}

// -------------------------
// Public NPCs query
// -------------------------
export function usePublicNpcsQuery(
  params: Omit<Parameters<GetPublicNpcsFn>[0], 'isPublic' | 'userId'>
): UseQueryResult<Awaited<ReturnType<GetPublicNpcsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetPublicNpcsFn>>, Error>({
    queryKey: ['publicNpcs', params],
    queryFn: async () => {
      const { getPublicNpcs } = await import('@/lib/actions/npc.actions');
      return await getPublicNpcs(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Resolved connections query
// -------------------------
export function useResolvedConnections(connections: Npc['connections']) {
  return useQuery<Awaited<ReturnType<ResolveConnectionNamesFn>>, Error>({
    queryKey: ['resolvedConnections', connections],
    queryFn: async () => {
      const { resolveConnectionNames } = await import('@/lib/actions/npc.actions');
      return await resolveConnectionNames(connections);
    },
    enabled: Array.isArray(connections) && connections.length > 0,
  });
}
