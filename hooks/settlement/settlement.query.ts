'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { getSettlements, getSettlementById, getOwnedSettlements, getPublicSettlements } from '@/lib/actions/settlement.actions';
import { useCampaignStore } from '@/store/campaignStore';
import { AppError } from '@/lib/errors/app-error';
import { ActionResult } from '@/interfaces/server-action.interface';
import { useActionQuery } from '../queryHook.util';

// -------------------------
// Types for server functions
// -------------------------
type GetSettlementsFn = typeof getSettlements;
type GetSettlementByIdFn = typeof getSettlementById;
type GetOwnedSettlementsFn = typeof getOwnedSettlements;
type GetPublicSettlementsFn = typeof getPublicSettlements;


// -------------------------
// Query key helper
// -------------------------
export const settlementKeys = {
  all: ['settlements'] as const,

  lists: () => [...settlementKeys.all, 'list' ] as const,
  list: (params?: Record<string, unknown>) =>
    [...settlementKeys.lists(), { ...params }] as const,

  public: (params?: Record<string, unknown>) =>
    [...settlementKeys.all, 'public', { ...params }] as const,

  owned: (params?: Record<string, unknown>) =>
    [...settlementKeys.all, 'owned', { ...params }] as const,

  campaign: (campaignId?: string, params?: Record<string, unknown>) =>
    [...settlementKeys.all, 'campaign', campaignId ?? 'none', { ...params }] as const,
  
  detail: (id?: string | null) =>
    [...settlementKeys.all, 'detail', id ?? 'unknown'] as const,
}


// -------------------------
// Single settlement query
// -------------------------
export function useSettlementQuery(
  settlementId: Parameters<GetSettlementByIdFn>[0] | null
): UseQueryResult<ReturnType<GetSettlementByIdFn> extends Promise<ActionResult<infer T>> ? T : never, AppError> {
  return useActionQuery(
    settlementKeys.detail(settlementId),
    async () => {
      if (!settlementId) throw new AppError('No settlement ID provided', 400);
      const { getSettlementById } = await import('@/lib/actions/settlement.actions');
      return await getSettlementById(settlementId);
    },
    {
      enabled: !!settlementId
    }
  )
}

// -------------------------
// Public settlements query
// -------------------------
export function usePublicSettlementsQuery(
  params: Omit<Parameters<GetSettlementsFn>[0], 'isPublic' | 'userId'>
): UseQueryResult<ReturnType<GetPublicSettlementsFn> extends Promise<ActionResult<infer T>> ? T : never, AppError> {
  return useActionQuery(
    settlementKeys.public(params),
    async () => {
      const { getPublicSettlements } = await import('@/lib/actions/settlement.actions');
      return await getPublicSettlements(params);
    }, 
    {
      staleTime: 1000 * 60 * 5
    }
  )
}

// -------------------------
// Owned settlements query
// -------------------------
export function useOwnedSettlementsQuery(
  params: Omit<Parameters<GetOwnedSettlementsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<ReturnType<GetOwnedSettlementsFn> extends Promise<ActionResult<infer T>> ? T : never, AppError> {
  const { selectedCampaign } = useCampaignStore();
  
  const mergedParams = {
    ...params,
    campaignId: selectedCampaign?._id || undefined,
  };

  const queryKey = selectedCampaign
  ? settlementKeys.campaign(selectedCampaign._id, mergedParams)
  : settlementKeys.owned(mergedParams);

  const action = async () => {
    if(selectedCampaign){
      const { getCampaignSettlements } = await import('@/lib/actions/settlement.actions');
      return getCampaignSettlements(params, selectedCampaign._id);
    } else {
      const { getOwnedSettlements } = await import('@/lib/actions/settlement.actions');
      return await getOwnedSettlements(mergedParams);
    }
  }

  return useActionQuery(
    queryKey, 
    action, 
    { enabled: options?.isEnabled ?? true , 
      staleTime: 1000 * 60 * 5
    }
  )
}
