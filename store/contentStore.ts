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
  mode: FormMode;

  setItems: (items: T[]) => void;
  applyFilters: (filters: ContentFilters, filterFn?: FilterFunction<T>) => void;
  clearFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;

  setSelectedItem: (item: T) => void;
  clearSelectedItem: () => void;
  setMode: (mode: FormMode) => void;
  clearMode: () => void;

  context?: Record<string, any>; // or something more structured if desired
  setContext?: (context: Record<string, any>) => void;
  clearContext?: () => void;
};

export function createContentStore<T>() {
  return create<ContentStore<T>>((set, get) => ({
    allItems: [],
    filteredItems: [],
    selectedItem: null,

    filters: {},
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

    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),

    setSelectedItem: (item: T) => set({ selectedItem: item }),
    clearSelectedItem: () => set({ selectedItem: null }),

    setMode: (mode: FormMode) => set({ mode }),
    clearMode: () => set({ mode: null }),

    context: {},
    setContext: (context) => set({ context }),
    clearContext: () => set({ context: {} }),
  }));
}
