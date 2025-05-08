'use client';

import { useEffect, useState } from 'react';
import { useSettlementQuery } from '@/hooks/settlement.query';
import { useSightContentStore } from '@/store/sightStore';
import { useUIStore } from '@/store/uiStore';
import { SightType } from '@/interfaces/sight.interface';
import { usePaginatedSights } from '@/hooks/sight.query';
import { useSettlementContentStore } from '@/store/settlementStore';
import { createSight } from '@/lib/actions/sight.actions';

export function useSettlementLoader(settlementId: string | null) {
  const { setSelectedItem } = useSettlementContentStore();
  const { setItems: setSightItems } = useSightContentStore();
  const { setSettlementId } = useUIStore();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetching the settlement by its ID
  const { data: settlementData, isLoading: settlementLoading, refetch: refetchSettlement } = useSettlementQuery(settlementId);
  
  // Fetching the sights associated with the settlement
  const { data: sightData, refetch: refetchSights, isFetching: sightsLoading } =
    usePaginatedSights(settlementId as string, page, limit, [], "");

  useEffect(() => {
    if (settlementData) {
      setSelectedItem(settlementData); // Set the selected settlement
      setSettlementId(settlementData._id); // Set the settlementId
    }

    if (sightData) {
      setSightItems(sightData.sights); // Set sights in the store
    }

    setLoading(false);
  }, [settlementData, sightData, setSelectedItem, setSettlementId, setSightItems]);
  

  async function addSight(newSight: SightType, settlementId: string) {
    try {
      // Save the new sight to the database
      const savedSight = await createSight(newSight, settlementId);
  
      // Once saved, update the Zustand store with the new sight
      const store = useSightContentStore.getState();
      const currentSights = store.allItems;
  
      store.setItems([...currentSights, savedSight]); // Add saved sight to the store
  
      await refetchSights();  // Refresh sights after the new sight is added
    } catch (error) {
      console.error('Error adding sight:', error);
    }
  }

  function deleteSight(id: string) {
    const store = useSightContentStore.getState(); // Access current Zustand store state
    const currentItems = store.allItems;
    const filteredItems = currentItems.filter((loc) => loc._id !== id);
  
    store.setItems(filteredItems);  // Update store after deletion
    refetchSights(); // Re-fetch sights to update UI
  }

  return {
    settlement: settlementData,
    sights: sightData?.sights,
    page,
    setPage,
    limit, 
    setLimit,
    totalPages: sightData?.totalPages ?? 1,
    loading: loading || sightsLoading,
    addSight,
    deleteSight,
  };
}
