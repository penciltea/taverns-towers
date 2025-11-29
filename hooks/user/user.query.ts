'use client';

import { UseQueryResult } from '@tanstack/react-query';
import { getFavorites, getRecentActivity } from '@/lib/actions/user.actions';
import { ActionResult } from '@/interfaces/server-action.interface';
import { AppError } from '@/lib/errors/app-error';
import { useActionQuery } from '../queryHook.util';

type GetRecentActivityFn = typeof getRecentActivity;
type GetFavoritesFn = typeof getFavorites;


// -------------------------
// Query key helper
// -------------------------
export const userKeys = {
  all: ['user'] as const,

  recent: (limit: number, userId: string) =>
    [...userKeys.all, 'recentActivity', limit, userId] as const,
  
  favorites: (userId: string) =>
    [...userKeys.all, 'favorites', userId] as const,
}

// -------------------------
// Recent activity query
// -------------------------
export const useRecentActivityQuery = (
  limit = 5,
  userId: string
):UseQueryResult<
  ReturnType<GetRecentActivityFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> => {
  return useActionQuery(
    userKeys.recent(limit, userId ?? 'unknown'),
    async () => {
      const { getRecentActivity } = await import('@/lib/actions/user.actions') as { getRecentActivity: GetRecentActivityFn };
      return await getRecentActivity(limit);
    },
    {
      staleTime: 1000 * 60 * 2,
    }
  )
};


export const useGetFavorites = (
  userId?: string,
): UseQueryResult<
  ReturnType<GetFavoritesFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> => {
  return useActionQuery(
    userKeys.favorites(userId ?? 'unknown'),
    async () => {
      if(!userId) throw new AppError('No user ID provided', 500);

      const { getFavorites } = await import('@/lib/actions/user.actions') as { getFavorites: GetFavoritesFn };
      return await getFavorites();
    },
    {
      staleTime: 1000 * 60 * 2,
    }
  )
}