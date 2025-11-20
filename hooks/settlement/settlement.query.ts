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
// Settlements list query
// -------------------------
export function useSettlementsQuery(
  params: Parameters<GetSettlementsFn>[0]
): UseQueryResult<ReturnType<GetSettlementsFn> extends Promise<ActionResult<infer T>> ? T : never, AppError> {
  return useActionQuery(
    ['settlements', params],
    async () => {
      const { getSettlements } = await import('@/lib/actions/settlement.actions');
      return await getSettlements(params);
    },
    {
      staleTime: 1000 * 60 * 5
    }
  )
}

// -------------------------
// Single settlement query
// -------------------------
export function useSettlementQuery(
  settlementId: Parameters<GetSettlementByIdFn>[0] | null
): UseQueryResult<ReturnType<GetSettlementByIdFn> extends Promise<ActionResult<infer T>> ? T : never, AppError> {
  return useActionQuery(
    ['settlement', settlementId],
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
    ['publicSettlements', params],
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
  ? ['campaignSettlements', selectedCampaign._id, mergedParams]
  : ['ownedSettlements', mergedParams];

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
