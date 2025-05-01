'use client';

import { useEffect, useState } from 'react';
import { useSettlementQuery } from '@/hooks/settlement.query';
import { useLocationContentStore } from '@/store/locationStore';
import { useUIStore } from '@/store/uiStore';
import { LocationType } from '@/interfaces/location.interface';
import { usePaginatedLocations } from '@/hooks/location.query';
import { useSettlementContentStore } from '@/store/settlementStore';
import { createLocation } from '@/lib/actions/location.actions';

export function useSettlementLoader(settlementId: string | null) {
  const { setSelectedItem } = useSettlementContentStore();
  const { setItems: setLocationItems } = useLocationContentStore();
  const { setSettlementId } = useUIStore();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetching the settlement by its ID
  const { data: settlementData, isLoading: settlementLoading, refetch: refetchSettlement } = useSettlementQuery(settlementId);
  
  // Fetching the locations associated with the settlement
  const { data: locationData, refetch: refetchLocations, isFetching: locationsLoading } =
    usePaginatedLocations(settlementId as string, page, limit, [], "");

  useEffect(() => {
    if (settlementData) {
      setSelectedItem(settlementData); // Set the selected settlement
      setSettlementId(settlementData._id); // Set the settlementId
    }

    if (locationData) {
      setLocationItems(locationData.locations); // Set locations in the store
    }

    setLoading(false);
  }, [settlementData, locationData, setSelectedItem, setSettlementId, setLocationItems]);
  

  async function addLocation(newLocation: LocationType, settlementId: string) {
    try {
      // Save the new location to the database
      const savedLocation = await createLocation(newLocation, settlementId);
  
      // Once saved, update the Zustand store with the new location
      const store = useLocationContentStore.getState();
      const currentLocations = store.allItems;
  
      store.setItems([...currentLocations, savedLocation]); // Add saved location to the store
  
      await refetchLocations();  // Refresh locations after the new location is added
    } catch (error) {
      console.error('Error adding location:', error);
    }
  }

  function deleteLocation(id: string) {
    const store = useLocationContentStore.getState(); // Access current Zustand store state
    const currentItems = store.allItems;
    const filteredItems = currentItems.filter((loc) => loc._id !== id);
  
    store.setItems(filteredItems);  // Update store after deletion
    refetchLocations(); // Re-fetch locations to update UI
  }

  return {
    settlement: settlementData,
    locations: locationData?.locations,
    page,
    setPage,
    limit, 
    setLimit,
    totalPages: locationData?.totalPages ?? 1,
    loading: loading || locationsLoading,
    addLocation,
    deleteLocation,
  };
}
