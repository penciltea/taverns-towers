'use client'

import { useEffect, useState } from 'react';
import { useAuthStore } from "@/store/authStore";
import { useOwnedCampaignsQuery } from '@/hooks/campaign/campaign.query';
import { DefaultCampaignQueryParams, CampaignQueryParams } from '@/interfaces/campaign.interface';
import AuthGate from '@/components/Auth/AuthGuard';
import { Spinner } from '@/components/Common/Spinner';
import FilteredGridView from '@/components/Grid/FilteredGridView';
import GridItem from '@/components/Grid/GridItem';
import { Typography } from '@mui/material';
import CampaignFilters from '@/components/Campaign/View/CampaignFilters';

export default function CampaignsPage(){
    const user = useAuthStore(state => state.user);

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
    const { data, isLoading, error } = useOwnedCampaignsQuery(params!, {
        isEnabled: !!params
    });

    function handleContentTitle(){
        if( data?.campaigns && data?.campaigns.length > 1 ){
            return "Campaigns"
        } else {
            return "Campaign"
        }
    }

    return (
        <AuthGate fallbackText="You must be logged in to view your campaigns." allowedTiers={["Artisan", "Architect"]}>
            {!params || isLoading ? (
                <Spinner />
            ) : error || !data?.success ? (
                <Typography>Looks like your world is still a bit quiet. Create an NPC to populate your story — every bustling market or haunted forest needs someone to talk to (or run from).</Typography>
            ) : (
                <FilteredGridView
                    title="My Campaigns"
                    titleVariant="h3"
                    titleComponent="h1"
                    description="NPCs are the personalities that inhabit your world. From eccentric shopkeepers and wandering sages to rival adventurers, they bring voice, drama, and surprise to every encounter."
                    content={handleContentTitle().toString()}
                    searchVariant="h5"
                    searchComponent="h2"
                    countVariant="subtitle1"
                    countComponent="h3"
                    items={data.campaigns}
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
                    totalCount={data.total}
                    pageSize={params.limit}
                    fabLabel="Create Campaign"
                    fabLink="/campaigns/new"
                />
            )}
        </AuthGate>
    );
}