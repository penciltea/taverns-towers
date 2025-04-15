import { create } from "zustand";
import getById from "@/lib/api/towns/getById";
import { Town } from "@/interfaces/town.interface";

type TownStore = {
  town: Town | null;
  isLoading: boolean;
  error: string | null;
  fetchTown: (id: string) => Promise<void>;
  setTown: (town: Town) => void;
  clearTown: () => void;
};

export const useTownStore = create<TownStore>((set) => ({
  town: null,
  isLoading: false,
  error: null,

  fetchTown: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const town = await getById(id);
      set({ town, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch town", isLoading: false });
    }
  },

  setTown: (town: Town) => set({ town }),

  clearTown: () => set({ town: null }),
}));
