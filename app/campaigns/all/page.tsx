'use client'

import { useEffect, useState } from 'react';
import { useAuthStore } from "@/store/authStore";
import { useAssignedCampaignsQuery, useOwnedCampaignsQuery } from '@/hooks/campaign/campaign.query';
import { DefaultCampaignQueryParams, CampaignQueryParams } from '@/interfaces/campaign.interface';
import AuthGate from '@/components/Auth/AuthGuard';
import { Spinner } from '@/components/Common/Spinner';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import GridItem from '@/components/Grid/GridItem';
import { Typography } from '@mui/material';
import CampaignFilters from '@/components/Campaign/View/CampaignFilters';
import { useCampaignAccess } from '@/hooks/campaign/useCampaignAccess';

export default function CampaignsPage(){
    const user = useAuthStore(state => state.user);
    const { canAccessCampaigns, isPremium } = useCampaignAccess();

    const [params, setParams] = useState<CampaignQueryParams>({
        ...DefaultCampaignQueryParams
    });

    // Set initial params after user loads
    useEffect(() => {
        if (user) {
            setParams({ ...DefaultCampaignQueryParams });
        }
    }, [user]);

    // Prevent query call until params are ready
    const { data: ownedData, isLoading: ownedLoading } = useOwnedCampaignsQuery(params!, {
        isEnabled: !!params && !!user?.id,
    });

    const { data: assignedData, isLoading: assignedLoading } = useAssignedCampaignsQuery(user?.id, {
        isEnabled: !!user?.id,
    });

    const allCampaigns = [
        ...(ownedData?.campaigns || []),
        ...(assignedData || []),
    ];

    const uniqueCampaigns = Object.values(
        allCampaigns.reduce((acc, campaign) => {
            acc[campaign._id] = campaign;
            return acc;
        }, {} as Record<string, typeof allCampaigns[0]>)
    );

    function handleContentTitle(){
        if( allCampaigns && allCampaigns.length > 1 ){
            return "Campaigns"
        } else {
            return "Campaign"
        }
    }

    return (
        <AuthGate fallbackText="You must be logged in to view your campaigns." hasAccess={canAccessCampaigns}>
            {(!params || ownedLoading || assignedLoading) ? (
                <Spinner />
            ) : uniqueCampaigns.length === 0 ? (
                <Typography>It seems your adventures haven&apos;t begun just yet. Create a campaign to start weaving your tales; every grand story needs a world to call its own.</Typography>
            ) : (
                <FilteredGridView
                    title="My Campaigns"
                    titleVariant="h3"
                    titleComponent="h1"
                    description="Campaigns are the heart of your storytelling, the grand frameworks where your worlds, characters, and adventures come together. Gather your players, chart your quests, and bring your stories to life, one session at a time."
                    content={handleContentTitle().toString()}
                    searchVariant="h5"
                    searchComponent="h2"
                    countVariant="subtitle1"
                    countComponent="h3"
                    items={uniqueCampaigns}
                    renderItem={(campaign) => (
                        <GridItem
                            key={campaign._id}
                            link={`/campaigns/${campaign._id}`}
                            title={campaign.name}
                            tone={campaign.tone}
                            genre={campaign.genre}

                        />
                    )}
                    filterComponent={
                        <CampaignFilters
                            filters={params}
                            setFilters={(newFilters) =>
                                setParams((prev) => ({ ...prev!, ...newFilters, page: 1 }))
                            }
                        />
                    }
                    currentPage={params.page}
                    onPageChange={(newPage) =>
                        setParams((prev) => ({ ...prev!, page: newPage }))
                    }
                    totalCount={uniqueCampaigns.length}
                    pageSize={params.limit}
                    fabLabel="Create Campaign"
                    fabLink="/campaigns/new"
                    fabPermissions={isPremium}
                />
            )}
        </AuthGate>
    );
}