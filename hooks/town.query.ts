import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { getTowns, getTownById } from '@/lib/actions/town.actions';
import { TownResponse } from '@/interfaces/town.interface';
import { Town } from '@/interfaces/town.interface';

export const useTownsQuery = (
  params: Parameters<typeof getTowns>[0]
): UseQueryResult<TownResponse> => {
  return useQuery<TownResponse, Error, TownResponse, [string, typeof params]>({
    queryKey: ['towns', params],
    queryFn: () => getTowns(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTownQuery = (townId: string | null) => {
  return useQuery<Town, Error>({
    queryKey: ['town', townId],
    queryFn: () => getTownById(townId as string),
    enabled: !!townId, // Only fetch if townId is available
  });
};