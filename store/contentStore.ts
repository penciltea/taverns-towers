import { create } from 'zustand';

type ContentFilters = {
  search?: string;
  sortBy?: string;
  tags?: string[];
  [key: string]: any;
};

type ContentStore<T> = {
  allItems: T[];
  filteredItems: T[];
  selectedItem: T | null;

  filters: ContentFilters;
  isLoading: boolean;

  setItems: (items: T[]) => void;
  applyFilters: (filters: ContentFilters) => void;
  clearFilters: () => void;
  setLoading: (value: boolean) => void;

  setSelectedItem: (item: T) => void;
  clearSelectedItem: () => void;
};

export const createContentStore = <T>() =>
  create<ContentStore<T>>((set, get) => ({
    allItems: [],
    filteredItems: [],
    selectedItem: null,

    filters: {},
    isLoading: false,

    setItems: (items: T[]) =>
      set({ allItems: items, filteredItems: items }),

    applyFilters: (filters: ContentFilters) => {
      const { allItems } = get();

      const filtered = allItems.filter((item: any) => {
        const matchesSearch =
          !filters.search ||
          item.name?.toLowerCase().includes(filters.search.toLowerCase());

        const matchesTags =
          !filters.tags || filters.tags.every((tag) => item.tags?.includes(tag));

        return matchesSearch && matchesTags;
      });

      set({ filteredItems: filtered, filters });
    },

    clearFilters: () => {
      const { allItems } = get();
      set({ filters: {}, filteredItems: allItems });
    },

    setLoading: (value: boolean) => set({ isLoading: value }),

    setSelectedItem: (item: T) => set({ selectedItem: item }),
    clearSelectedItem: () => set({ selectedItem: null }),
  }));
