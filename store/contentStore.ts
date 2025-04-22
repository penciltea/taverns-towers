import { create } from 'zustand';

export type ContentFilters = {
  [key: string]: any;
};

type FormMode = 'add' | 'edit' | null;

type FilterFunction<T> = (item: T, filters: ContentFilters) => boolean;

type ContentStore<T> = {
  allItems: T[];
  filteredItems: T[];
  selectedItem: T | null;

  filters: ContentFilters;
  isLoading: boolean;
  mode: FormMode;

  setItems: (items: T[]) => void;
  applyFilters: (filters: ContentFilters, filterFn?: FilterFunction<T>) => void;
  clearFilters: () => void;
  setLoading: (value: boolean) => void;

  setSelectedItem: (item: T) => void;
  clearSelectedItem: () => void;
  setMode: (mode: FormMode) => void;
  clearMode: () => void;
};

export function createContentStore<T>() {
  return create<ContentStore<T>>((set, get) => ({
    allItems: [],
    filteredItems: [],
    selectedItem: null,

    filters: {},
    isLoading: false,
    mode: null,

    setItems: (items: T[]) => {
      set({ allItems: items, filteredItems: items });
    },

    applyFilters: (filters: ContentFilters, filterFn?: (item: T, filters: ContentFilters) => boolean) => {
      const { allItems } = get();
    
      const defaultFilterFn = () => true;
      
      const finalFilterFn = filterFn || defaultFilterFn;
      const filtered = allItems.filter((item) => finalFilterFn(item, filters));
    
      set({ filteredItems: filtered, filters });
    },

    clearFilters: () => {
      const { allItems } = get();
      set({ filters: {}, filteredItems: allItems });
    },

    setLoading: (value: boolean) => set({ isLoading: value }),

    setSelectedItem: (item: T) => set({ selectedItem: item }),
    clearSelectedItem: () => set({ selectedItem: null }),

    setMode: (mode: FormMode) => set({ mode }),
    clearMode: () => set({ mode: null }),
  }));
}
