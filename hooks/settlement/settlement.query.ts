'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { getSettlements, getSettlementById, getOwnedSettlements, getPublicSettlements } from '@/lib/actions/settlement.actions';
import { useCampaignStore } from '@/store/campaignStore';

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
): UseQueryResult<Awaited<ReturnType<GetSettlementsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetSettlementsFn>>, Error>({
    queryKey: ['settlements', params],
    queryFn: async () => {
      const { getSettlements } = await import('@/lib/actions/settlement.actions');
      return await getSettlements(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Single settlement query
// -------------------------
export function useSettlementQuery(
  settlementId: Parameters<GetSettlementByIdFn>[0] | null
): UseQueryResult<Awaited<ReturnType<GetSettlementByIdFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetSettlementByIdFn>>, Error>({
    queryKey: ['settlement', settlementId],
    queryFn: async () => {
      if (!settlementId) throw new Error('No settlement ID provided');
      const { getSettlementById } = await import('@/lib/actions/settlement.actions');
      return await getSettlementById(settlementId);
    },
    enabled: !!settlementId,
  });
}

// -------------------------
// Public settlements query
// -------------------------
export function usePublicSettlementsQuery(
  params: Omit<Parameters<GetSettlementsFn>[0], 'isPublic' | 'userId'>
): UseQueryResult<Awaited<ReturnType<GetPublicSettlementsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetPublicSettlementsFn>>, Error>({
    queryKey: ['publicSettlements', params],
    queryFn: async () => {
      const { getPublicSettlements } = await import('@/lib/actions/settlement.actions');
      return await getPublicSettlements(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Owned settlements query
// -------------------------
export function useOwnedSettlementsQuery(
  params: Omit<Parameters<GetOwnedSettlementsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetOwnedSettlementsFn>>, Error> {
  const { selectedCampaign } = useCampaignStore();
  
  const mergedParams = {
    ...params,
    campaignId: selectedCampaign?._id || undefined,
  };

  return useQuery<Awaited<ReturnType<GetOwnedSettlementsFn>>, Error>({
    queryKey: selectedCampaign
      ? ['campaignSettlements', selectedCampaign._id, mergedParams]
      : ['ownedSettlements', mergedParams],
    queryFn: async () => {
      if (selectedCampaign) {
        const { getCampaignSettlements } = await import('@/lib/actions/settlement.actions');
        return getCampaignSettlements(params, selectedCampaign._id);
      } else {
        const { getOwnedSettlements } = await import('@/lib/actions/settlement.actions');
        return await getOwnedSettlements(mergedParams);
      }      
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
}
