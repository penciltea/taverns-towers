import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Npc } from '@/interfaces/npc.interface';
import { NpcResponse } from '@/interfaces/npc.interface';
import { getNpcs, getOwnedNpcs, getPublicNpcs, getNpcById, resolveConnectionNames } from '@/lib/actions/npc.actions';


export const useOwnedNpcsQuery = (
  params: Omit<Parameters<typeof getNpcs>[0], 'isPublic'>,
  options?: {
    isEnabled: boolean;
  }
): UseQueryResult<NpcResponse> => {
  return useQuery<NpcResponse, Error>({
    queryKey: ['ownedNpcs', params],
    queryFn: () => getOwnedNpcs(params),
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
};

export const usePublicNpcsQuery = (
  params: Omit<Parameters<typeof getNpcs>[0], 'isPublic' | 'userId'>
): UseQueryResult<NpcResponse> => {
  return useQuery<NpcResponse, Error, NpcResponse, [string, typeof params]>({
    queryKey: ['publicNpcs', params],
    queryFn: () => getPublicNpcs(params),
    staleTime: 1000 * 60 * 5,
  });
};

export function useResolvedConnections(connections: Npc['connections']) {
  return useQuery({
    queryKey: ['resolvedConnections', connections],
    queryFn: () => resolveConnectionNames(connections),
    enabled: connections.length > 0,
  });
}