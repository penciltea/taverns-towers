'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { getCampaigns, getCampaignById, getOwnedCampaigns, getPublicCampaigns, getAssignedCampaigns, getCampaignPermissions, getUserCampaigns, getCampaignHighlights } from '@/lib/actions/campaign.actions';
import { CampaignForClient } from '@/interfaces/campaign.interface';
import { ActionResult } from '@/interfaces/server-action.interface';
import { AppError } from '@/lib/errors/app-error';

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
): UseQueryResult<Awaited<ReturnType<GetCampaignsFn>>, Error> {
    return useQuery<Awaited<ReturnType<GetCampaignsFn>>, Error>({
        queryKey: ['campaigns', params],
        queryFn: async () => {
            const { getCampaigns } = await import('@/lib/actions/campaign.actions');
            return await getCampaigns(params);
        },
        staleTime: 1000 * 60 * 5,
    });
}

// -------------------------
// Single campaign query
// -------------------------
export function useGetCampaignById(
  campaignId: Parameters<GetCampaignByIdFn>[0] | null
): UseQueryResult<CampaignForClient, AppError> {
  return useQuery<CampaignForClient, AppError>({
    queryKey: ['campaign', campaignId],
    queryFn: async () => {
      if (!campaignId) throw new AppError('No campaign ID provided', 400);

      const { getCampaignById } = await import('@/lib/actions/campaign.actions');
      const result: ActionResult<CampaignForClient> = await getCampaignById(campaignId);

      if (result.success) {
        return result.data;
      } else {
        throw new AppError(result.message, result.status ?? 500);
      }
    },
    enabled: !!campaignId,
  });
}

// -------------------------
// Public campaigns query
// -------------------------
export function usePublicCampaignsQuery(
  params: Omit<Parameters<GetCampaignsFn>[0], 'isPublic' | 'userId'>
): UseQueryResult<Awaited<ReturnType<GetPublicCampaignsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetPublicCampaignsFn>>, Error>({
    queryKey: ['publicCampaigns', params],
    queryFn: async () => {
      const { getPublicCampaigns } = await import('@/lib/actions/campaign.actions');
      return await getPublicCampaigns(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Owned campaigns query
// -------------------------
export function useOwnedCampaignsQuery(
  params: Omit<Parameters<GetCampaignsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetOwnedCampaignsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetOwnedCampaignsFn>>, Error>({
    queryKey: ['ownedCampaigns', params],
    queryFn: async () => {
      const { getOwnedCampaigns } = await import('@/lib/actions/campaign.actions');
      return await getOwnedCampaigns(params);
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
}


// -------------------------
// Assigned campaigns query
// -------------------------
export function useAssignedCampaignsQuery(
  userId?: string,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetAssignedCampaignsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetAssignedCampaignsFn>>, Error>({
    queryKey: ['assignedCampaigns', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { getAssignedCampaigns } = await import('@/lib/actions/campaign.actions');
      return await getAssignedCampaigns(userId);
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? !!userId,
  });
}

// -------------------------
// Assigned & Owned campaigns query
// -------------------------
export function useUserCampaignsQuery(
  params: Omit<Parameters<GetUserCampaignsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetUserCampaignsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetUserCampaignsFn>>, Error>({
    queryKey: ['userCampaigns', params],
    queryFn: async () => {
      const { getUserCampaigns } = await import('@/lib/actions/campaign.actions');
      return getUserCampaigns(params);
    },
    enabled: options?.isEnabled ?? true,
    staleTime: 1000 * 60 * 5,
  });
}


// -------------------------
// Campaign permissions query
// -------------------------
export function useCampaignPermissionsQuery(
  campaignId?: string,
  options?: { isEnabled?: boolean }
): UseQueryResult<
  Awaited<ReturnType<GetCampaignPermissionsFn>>,
  Error
> {
  return useQuery<Awaited<ReturnType<GetCampaignPermissionsFn>>, Error>({
    queryKey: ['campaignPermissions', campaignId],
    queryFn: async () => {
      if (!campaignId) return null;
      const { getCampaignPermissions } = await import('@/lib/actions/campaign.actions');
      return await getCampaignPermissions(campaignId);
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    enabled: options?.isEnabled ?? !!campaignId,
  });
}


export function useGetCampaignHighlights(
  campaignId?: string
): UseQueryResult<
  Awaited<ReturnType<GetCampaignHighlightsFn>>,
  Error
> {
  return useQuery<Awaited<ReturnType<GetCampaignHighlightsFn>>, Error>({
    queryKey: ['campaignHighlights', campaignId],
    queryFn: async () => {
      if(!campaignId) return [];
      const { getCampaignHighlights } = await import('@/lib/actions/campaign.actions') as { getCampaignHighlights: GetCampaignHighlightsFn };
      return await getCampaignHighlights(campaignId);
    },
    staleTime: 1000 * 60 * 2,
  });
}