import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { getSightsBySettlementPaginated } from '@/lib/actions/sight.actions';
import { sightListKey } from '@/lib/util/queryKeys';
import { SightResponse } from '@/interfaces/sight.interface';

export const usePaginatedSights = (
  settlementId: string,
  page: number,
  limit: number,
  types: string[],
  name: string
) => {
  return useQuery<SightResponse>({
    queryKey: sightListKey(settlementId, page, limit, types, name),
    queryFn: () => getSightsBySettlementPaginated(settlementId, page, limit, types, name),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};