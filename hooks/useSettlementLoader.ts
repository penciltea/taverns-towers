'use client';

import { useEffect, useState } from 'react';
import { useSettlementQuery } from '@/hooks/settlement.query';
import { useSiteContentStore } from '@/store/siteStore';
import { useUIStore } from '@/store/uiStore';
import { SiteType } from '@/interfaces/site.interface';
import { usePaginatedSites } from './site.query';
import { useSettlementContentStore } from '@/store/settlementStore';
import { createSite } from '@/lib/actions/site.actions';

export function useSettlementLoader(settlementId: string | null) {
  const { setSelectedItem } = useSettlementContentStore();
  const { setItems: setSiteItems } = useSiteContentStore();
  const { setSettlementId, showErrorDialog } = useUIStore();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  // Fetching the settlement by its ID
  const { data: settlementData, isLoading: settlementLoading, refetch: refetchSettlement } = useSettlementQuery(settlementId);
  
  // Fetching the sites associated with the settlement
  const { data: siteData, refetch: refetchSites, isFetching: sitesLoading } =
    usePaginatedSites(settlementId as string, page, limit, [], "");

  useEffect(() => {
    if (settlementData) {
      setSelectedItem(settlementData); // Set the selected settlement
      setSettlementId(settlementData._id); // Set the settlementId
    }

    if (siteData) {
      setSiteItems(siteData.sites); // Set sites in the store
    }

    setLoading(false);
  }, [settlementData, siteData, setSelectedItem, setSettlementId, setSiteItems]);
  

  async function addSite(newSite: SiteType, settlementId: string) {
    try {
      // Save the new site to the database
      const savedSite = await createSite(newSite, settlementId);
  
      // Once saved, update the Zustand store with the new site
      const store = useSiteContentStore.getState();
      const currentSites = store.allItems;
  
      store.setItems([...currentSites, savedSite]); // Add saved site to the store
  
      await refetchSites();  // Refresh sites after the new site is added
    } catch (error) {
      console.error('Error adding site:', error);
      showErrorDialog("There was a problem adding the site, please try again later!");
    }
  }

  function deleteSite(id: string) {
    const store = useSiteContentStore.getState(); // Access current Zustand store state
    const currentItems = store.allItems;
    const filteredItems = currentItems.filter((loc) => loc._id !== id);
  
    store.setItems(filteredItems);  // Update store after deletion
    refetchSites(); // Re-fetch sites to update UI
  }

  return {
    settlement: settlementData,
    sites: siteData?.sites,
    page,
    setPage,
    limit, 
    setLimit,
    totalPages: siteData?.totalPages ?? 1,
    loading: loading || sitesLoading,
    addSite,
    deleteSite,
  };
}
