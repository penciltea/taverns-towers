import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { getLocationsByTownPaginated } from '@/lib/actions/location.actions';
import { LocationType } from '@/interfaces/location.interface';

type LocationParams = Parameters<typeof getLocationsByTownPaginated>;
type LocationResponse = Awaited<ReturnType<typeof getLocationsByTownPaginated>>;

export const usePaginatedLocations = (
  townId: string,
  page: number,
  limit: number,
  type?: string
): UseQueryResult<LocationResponse> => {
  return useQuery<LocationResponse, Error, LocationResponse, [string, ...LocationParams]>({
    queryKey: ['locations', townId, page, limit, type],
    queryFn: () => getLocationsByTownPaginated(townId, page, limit, type),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
