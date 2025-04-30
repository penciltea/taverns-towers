import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { getLocationsByTownPaginated } from '@/lib/actions/location.actions';
import { locationListKey } from '@/lib/util/queryKeys';
import { LocationResponse } from '@/interfaces/location.interface';

export const usePaginatedLocations = (
  townId: string,
  page: number,
  limit: number,
  type?: string
): UseQueryResult<LocationResponse> => {
  return useQuery<LocationResponse>({
    queryKey: locationListKey(townId, page, limit, type),
    queryFn: () => getLocationsByTownPaginated(townId, page, limit, type),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};