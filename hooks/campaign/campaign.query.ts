'use client';

import { UseQueryResult } from '@tanstack/react-query';
import type { getCampaigns, getCampaignById, getOwnedCampaigns, getPublicCampaigns, getAssignedCampaigns, getCampaignPermissions, getUserCampaigns, getCampaignHighlights } from '@/lib/actions/campaign.actions';
import { CampaignForClient } from '@/interfaces/campaign.interface';
import { ActionResult } from '@/interfaces/server-action.interface';
import { AppError } from '@/lib/errors/app-error';
import { useActionQuery } from '../queryHook.util';


// -------------------------
// Types for server functions
// -------------------------
type GetCampaignsFn = typeof getCampaigns;
type GetCampaignByIdFn = typeof getCampaignById;
type GetOwnedCampaignsFn = typeof getOwnedCampaigns;
type GetPublicCampaignsFn = typeof getPublicCampaigns;
type GetAssignedCampaignsFn = typeof getAssignedCampaigns;
type GetUserCampaignsFn = typeof getUserCampaigns;
type GetCampaignPermissionsFn = typeof getCampaignPermissions;
type GetCampaignHighlightsFn = typeof getCampaignHighlights;

// -------------------------
// Query key helper
// -------------------------
export const campaignKeys = {
  all: ['npcs'] as const,

  lists: () => [...campaignKeys.all, 'list' ] as const,
  list: (params?: Record<string, unknown>) =>
    [...campaignKeys.lists(), { ...params }] as const,

  public: (params?: Record<string, unknown>) =>
    [...campaignKeys.all, 'public', { ...params }] as const,

  owned: (params?: Record<string, unknown>) =>
    [...campaignKeys.all, 'owned', { ...params }] as const,

  assigned: (userId?: string | null) => 
    [...campaignKeys.all, 'assigned', userId ?? 'unknown'] as const,

  user: (params?: Record<string, unknown>) => 
    [...campaignKeys.all, 'user', { ...params }] as const,

  campaignPermissions: (campaignId?: string) =>
    [...campaignKeys.all, 'campaignPermissions', campaignId ?? 'none'] as const,

  campaignHighlights: (campaignId?: string) =>
    [...campaignKeys.all, 'campaignHighlights', campaignId ?? 'none'] as const,
  
  detail: (id?: string | null) =>
    [...campaignKeys.all, 'detail', id ?? 'unknown'] as const,
}


// -------------------------
// Single campaign query
// -------------------------
export function useGetCampaignById(
  campaignId: Parameters<GetCampaignByIdFn>[0] | null
): UseQueryResult<CampaignForClient, AppError> {
  return useActionQuery(
    campaignKeys.detail(campaignId),
    async () => {
      if (!campaignId) throw new AppError('No campaign ID provided', 400);
      const { getCampaignById } = await import('@/lib/actions/campaign.actions');
      return getCampaignById(campaignId);
    },
    { enabled: !!campaignId }
  );
}

// -------------------------
// Public campaigns query
// -------------------------
export function usePublicCampaignsQuery(
  params: Omit<Parameters<GetCampaignsFn>[0], 'isPublic' | 'userId'>
): UseQueryResult<
  ReturnType<GetPublicCampaignsFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> {
  return useActionQuery(
    campaignKeys.public(params),
    async () => {
      const { getPublicCampaigns } = await import('@/lib/actions/campaign.actions');
      return getPublicCampaigns(params);
    },
    { staleTime: 1000 * 60 * 5 }
  );
}


// -------------------------
// Owned campaigns query
// -------------------------
export function useOwnedCampaignsQuery(
  params: Omit<Parameters<GetCampaignsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<
  ReturnType<GetOwnedCampaignsFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> {
  return useActionQuery(
    campaignKeys.owned(params),
    async () => {
      const { getOwnedCampaigns } = await import('@/lib/actions/campaign.actions');
      return getOwnedCampaigns(params);
    },
    {
      enabled: options?.isEnabled ?? true,
      staleTime: 1000 * 60 * 5,
    }
  );
}


// -------------------------
// Assigned campaigns query
// -------------------------
export function useAssignedCampaignsQuery(
  userId?: string,
  options?: { isEnabled?: boolean }
): UseQueryResult<
  ReturnType<GetAssignedCampaignsFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> {
  return useActionQuery(
    campaignKeys.assigned(userId),
    async () => {
      if (!userId) return { success: true, data: [] } as ActionResult<[]>; // safe fallback
      const { getAssignedCampaigns } = await import('@/lib/actions/campaign.actions');
      return getAssignedCampaigns(userId);
    },
    {
      enabled: options?.isEnabled ?? !!userId,
      staleTime: 1000 * 60 * 5,
    }
  );
}

// -------------------------
// Assigned & Owned campaigns query
// -------------------------
export function useUserCampaignsQuery(
  params: Omit<Parameters<GetUserCampaignsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<
  ReturnType<GetUserCampaignsFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> {
  return useActionQuery(
    campaignKeys.user(params),
    async () => {
      const { getUserCampaigns } = await import('@/lib/actions/campaign.actions');
      return getUserCampaigns(params);
    },
    {
      enabled: options?.isEnabled ?? true,
      staleTime: 1000 * 60 * 5,
    }
  );
}


// -------------------------
// Campaign permissions query
// -------------------------
export function useCampaignPermissionsQuery(
  campaignId?: string,
  options?: { isEnabled?: boolean }
): UseQueryResult<
  ReturnType<GetCampaignPermissionsFn> extends Promise<ActionResult<infer T>> ? T | null : null,
  AppError
> {
  return useActionQuery(
    campaignKeys.campaignPermissions(campaignId),
    async () => {
      if (!campaignId)
        return { success: true, data: null } as ActionResult<null>;

      const { getCampaignPermissions } = await import('@/lib/actions/campaign.actions');
      return getCampaignPermissions(campaignId);
    },
    {
      enabled: options?.isEnabled ?? !!campaignId,
      staleTime: 1000 * 60 * 5,
    }
  );
}


// -------------------------
// Campaign highlights query
// -------------------------
export function useGetCampaignHighlights(
  campaignId?: string
): UseQueryResult<
  ReturnType<GetCampaignHighlightsFn> extends Promise<ActionResult<infer T>> ? T : never,
  AppError
> {
  return useActionQuery(
    campaignKeys.campaignHighlights(campaignId),
    async () => {
      if (!campaignId)
        return { success: true, data: [] } as ActionResult<[]>;

      const { getCampaignHighlights } = await import('@/lib/actions/campaign.actions');
      return getCampaignHighlights(campaignId);
    },
    { staleTime: 1000 * 60 * 2 }
  );
}