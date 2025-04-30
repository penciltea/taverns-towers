import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { getLocationsByTownPaginated } from '@/lib/actions/location.actions';
import { locationListKey } from '@/lib/util/queryKeys';
import { LocationResponse } from '@/interfaces/location.interface';

export const usePaginatedLocations = (
  townId: string,
  page: number,
  limit: number,
  types: string[],
  name: string
) => {
  return useQuery<LocationResponse>({
    queryKey: locationListKey(townId, page, limit, types, name),
    queryFn: () => getLocationsByTownPaginated(townId, page, limit, types, name),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};