import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getSettlements, getSettlementById } from '@/lib/actions/settlement.actions';
import { SettlementResponse } from '@/interfaces/settlement.interface';
import { Settlement } from '@/interfaces/settlement.interface';

export const useSettlementsQuery = (
  params: Parameters<typeof getSettlements>[0]
): UseQueryResult<SettlementResponse> => {
  return useQuery<SettlementResponse, Error, SettlementResponse, [string, typeof params]>({
    queryKey: ['settlements', params],
    queryFn: () => getSettlements(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSettlementQuery = (settlementId: string | null) => {
  return useQuery<Settlement, Error>({
    queryKey: ['settlement', settlementId],
    queryFn: () => getSettlementById(settlementId as string),
    enabled: !!settlementId, // Only fetch if settlementId is available
  });
};