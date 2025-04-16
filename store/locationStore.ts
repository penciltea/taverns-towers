import { create } from 'zustand';
import { LocationFormData } from '@/schemas/locationSchema';
import { Location } from '@/interfaces/location.interface';

interface LocationStore {
  mode: "add" | "edit";
  type: string | null;
  location: Location | null;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  mode: "add",
  type: null,
  location: null,
  setLocation: (location: Location) => set({ location }),
  clearLocation: () => set({ location: null }),
}));