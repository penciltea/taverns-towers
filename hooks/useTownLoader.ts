'use client';

import { useEffect, useState } from 'react';
import { useTownQuery } from '@/hooks/town.query';
import { useLocationContentStore } from '@/store/locationStore';
import { useUIStore } from '@/store/uiStore';
import { LocationType } from '@/interfaces/location.interface';
import { usePaginatedLocations } from '@/hooks/location.query';
import { useTownContentStore } from '@/store/townStore';
import { createLocation } from '@/lib/actions/location.actions';

export function useTownLoader(townId: string | null) {
  const { setSelectedItem } = useTownContentStore();
  const { setItems: setLocationItems } = useLocationContentStore();
  const { setTownId } = useUIStore();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetching the town by its ID
  const { data: townData, isLoading: townLoading, refetch: refetchTown } = useTownQuery(townId);
  
  // Fetching the locations associated with the town
  const { data: locationData, refetch: refetchLocations, isFetching: locationsLoading } =
    usePaginatedLocations(townId as string, page, limit, [], "");

  useEffect(() => {
    if (townData) {
      setSelectedItem(townData); // Set the selected town
      setTownId(townData._id); // Set the townId
    }

    if (locationData) {
      setLocationItems(locationData.locations); // Set locations in the store
    }

    setLoading(false);
  }, [townData, locationData, setSelectedItem, setTownId, setLocationItems]);
  

  async function addLocation(newLocation: LocationType, townId: string) {
    try {
      // Save the new location to the database
      const savedLocation = await createLocation(newLocation, townId);
  
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
    town: townData,
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
