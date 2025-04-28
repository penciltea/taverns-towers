'use client';

import { useState, useEffect } from 'react';
import { getTownById } from '@/lib/actions/town.actions';
import { getLocationsByTown } from '@/lib/actions/location.actions';
import { useTownContentStore } from '@/store/townStore';
import { useLocationContentStore } from '@/store/locationStore';
import { useUIStore } from '@/store/uiStore';
import { Town } from '@/interfaces/town.interface';
import { LocationType } from '@/interfaces/location.interface';

export function useTownLoader(townId: string | null) {
  const { setSelectedItem } = useTownContentStore();
  const { setItems: setLocationItems } = useLocationContentStore();
  const { setTownId } = useUIStore();

  const [town, setTown] = useState<Town | null>(null);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!townId) return;
    async function loadTownAndLocations() {
      if (!townId) return;

      setLoading(true);
      try {
        const [townData, locationData] = await Promise.all([
          getTownById(townId),
          getLocationsByTown(townId),
        ]);

        if (townData) {
          setTown(townData);
          setSelectedItem(townData);
          setTownId(townData._id);
        }

        if (locationData) {
          setLocations(locationData);
          setLocationItems(locationData);
        }

      } catch (err) {
        console.error('Error loading town or locations:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTownAndLocations();
  }, [townId, setSelectedItem, setLocationItems, setTownId]);

  function deleteLocation(id: string) {
    setLocations(prev => prev.filter(loc => loc._id !== id));
  }

  return { town, locations, loading, deleteLocation };
}
