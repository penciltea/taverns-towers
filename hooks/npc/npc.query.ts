'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Npc } from '@/interfaces/npc.interface';
import type { getOwnedNpcs, getPublicNpcs, getNpcById, resolveConnectionNames } from '@/lib/actions/npc.actions';
import { useCampaignStore } from '@/store/campaignStore';
import { ActionResult } from '@/interfaces/server-action.interface';
import { AppError } from '@/lib/errors/app-error';
import { useActionQuery } from '../queryHook.util';

// -------------------------
// Types for server functions
// -------------------------
type GetNpcByIdFn = typeof getNpcById;
type GetOwnedNpcsFn = typeof getOwnedNpcs;
type GetPublicNpcsFn = typeof getPublicNpcs;
type UseResolveConnectionNamesFn = typeof resolveConnectionNames;

// -------------------------
// Single NPC query
// -------------------------
export function useGetNpcById(id: Parameters<GetNpcByIdFn>[0] | null): UseQueryResult<ReturnType<GetNpcByIdFn> extends Promise<ActionResult<infer T>> ? T : never, AppError> {
  return useActionQuery(
    ['npc', id],
    async () => {
      if (!id) throw new AppError('No NPC ID provided', 400);
      const { getNpcById } = await import('@/lib/actions/npc.actions');
      return await getNpcById(id);
    },
    { enabled: !!id }
  );
}

// -------------------------
// Owned NPCs query
// -------------------------
export function useOwnedNpcsQuery(
  params: Omit<Parameters<GetOwnedNpcsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean; staleTime?: number }
): UseQueryResult<
  ReturnType<GetOwnedNpcsFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> {
  const { selectedCampaign } = useCampaignStore();

  const mergedParams = {
    ...params,
    campaignId: selectedCampaign?._id || undefined,
  };

  const queryKey = selectedCampaign
    ? ['campaignNpcs', selectedCampaign._id, mergedParams]
    : ['ownedNpcs', mergedParams];

  const action = async () => {
    if (selectedCampaign) {
      const { getCampaignNpcs } = await import('@/lib/actions/npc.actions');
      return getCampaignNpcs(params, selectedCampaign._id);
    } else {
      const { getOwnedNpcs } = await import('@/lib/actions/npc.actions');
      return getOwnedNpcs(params);
    }
  };

  return useActionQuery(queryKey, action, {
    enabled: options?.isEnabled ?? true,
    staleTime: options?.staleTime ?? 1000 * 60 * 5,
  });
}


// -------------------------
// Public NPCs query
// -------------------------
export function usePublicNpcsQuery(
  params: Omit<Parameters<GetPublicNpcsFn>[0], 'isPublic' | 'userId'>
): UseQueryResult<ReturnType<GetPublicNpcsFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> {
  return useActionQuery(
    ['publicNpcs', params],
    async () => {
      const { getPublicNpcs } = await import('@/lib/actions/npc.actions');
      return await getPublicNpcs(params);
    }, 
    {
      staleTime: 1000 * 60 * 5
    }
  );

}

// -------------------------
// Resolved connections query
// -------------------------
export function useResolvedConnections(connections: Npc['connections']): UseQueryResult<ReturnType<UseResolveConnectionNamesFn>  extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> {
  return useActionQuery(
    ['resolvedConnections', connections],
    async () => {
      const { resolveConnectionNames } = await import('@/lib/actions/npc.actions');
      return await resolveConnectionNames(connections);
    },
    {
      enabled: Array.isArray(connections) && connections.length > 0
    }
  )
}