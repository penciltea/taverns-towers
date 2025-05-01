import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { getLocationsBySettlementPaginated } from '@/lib/actions/location.actions';
import { locationListKey } from '@/lib/util/queryKeys';
import { LocationResponse } from '@/interfaces/location.interface';

export const usePaginatedLocations = (
  settlementId: string,
  page: number,
  limit: number,
  types: string[],
  name: string
) => {
  return useQuery<LocationResponse>({
    queryKey: locationListKey(settlementId, page, limit, types, name),
    queryFn: () => getLocationsBySettlementPaginated(settlementId, page, limit, types, name),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};