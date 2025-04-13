import { create } from 'zustand';
import { LocationFormData } from '@/schemas/locationSchema';

interface LocationStore {
  locations: LocationFormData[];
  selectedLocation: LocationFormData | null;
  setLocations: (locations: LocationFormData[]) => void;
  addLocation: (location: LocationFormData) => void;
  updateLocation: (location: LocationFormData) => void;
  setSelectedLocation: (location: LocationFormData | null) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  selectedLocation: null,

  setLocations: (locations) => set({ locations }),
  addLocation: (location) =>
    set((state) => ({ locations: [...state.locations, location] })),
  updateLocation: (updatedLocation) =>
    set((state) => ({
      locations: state.locations.map((loc) =>
        loc.name === updatedLocation.name ? updatedLocation : loc
      ),
    })),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));