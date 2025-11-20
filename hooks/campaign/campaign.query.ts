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
// Campaigns list query
// -------------------------

export function useCampaignsQuery(
  params: Parameters<GetCampaignsFn>[0]
): UseQueryResult<ReturnType<GetCampaignsFn> extends Promise<ActionResult<infer T>> ? T : never, AppError> {
  return useActionQuery(
    ['campaigns', params],
    async () => {
      const { getCampaigns } = await import('@/lib/actions/campaign.actions');
      return getCampaigns(params);
    },
    { staleTime: 1000 * 60 * 5 }
  );
}

// -------------------------
// Single campaign query
// -------------------------
export function useGetCampaignById(
  campaignId: Parameters<GetCampaignByIdFn>[0] | null
): UseQueryResult<CampaignForClient, AppError> {
  return useActionQuery(
    ['campaign', campaignId],
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
    ['publicCampaigns', params],
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
    ['ownedCampaigns', params],
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
    ['assignedCampaigns', userId],
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
    ['userCampaigns', params],
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
    ['campaignPermissions', campaignId],
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
    ['campaignHighlights', campaignId],
    async () => {
      if (!campaignId)
        return { success: true, data: [] } as ActionResult<[]>;

      const { getCampaignHighlights } = await import('@/lib/actions/campaign.actions');
      return getCampaignHighlights(campaignId);
    },
    { staleTime: 1000 * 60 * 2 }
  );
}