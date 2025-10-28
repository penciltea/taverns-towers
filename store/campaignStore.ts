import { Campaign } from '@/interfaces/campaign.interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CampaignStore = {
    campaigns: Campaign[];
    selectedCampaign: Campaign | null;
    loading: boolean;
    error: string | null;

    setCampaigns: (campaigns: Campaign[]) => void;
    setSelectedCampaign: (campaign: Campaign | null) => void;
    clearSelectedCampaign: () => void;

    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set) => ({
        campaigns: [],
        selectedCampaign: null,
        loading: false,
        error: null,
    
        setCampaigns: (campaigns: Campaign[]) => {
            set({ campaigns });
        },
        setSelectedCampaign: (campaign: Campaign | null) => {
            set({ selectedCampaign: campaign });
        },
        clearSelectedCampaign: () => {
            set({ selectedCampaign: null });
        },
    
        setLoading: (loading: boolean) => {
            set({ loading });
        },
        setError: (error: string | null) => {
            set({ error });
        },
        reset: () => {
            set({
                campaigns: [],
                selectedCampaign: null,
                loading: false,
                error: null,
            });
        }
    }),
    {
      name: "campaign-store",
      partialize: (state) => ({
        selectedCampaign: state.selectedCampaign,
        campaigns: state.campaigns.map((c) => ({
          _id: c._id,
          name: c.name,
        })),
      }),
    }
  )
);