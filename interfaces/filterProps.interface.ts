import { ContentFilters } from "@/store/contentStore";

export interface FilterBarProps<T> {
    filters: ContentFilters;
    applyFilters: (filters: ContentFilters, filterFn: (item: T, filters: ContentFilters) => boolean) => void;
    clearFilters: () => void;
    filterFn: (item: T, filters: ContentFilters) => boolean;
    children?: React.ReactNode; // for custom filter fields like size, climate, etc.
    onOpenAdvanced?: () => void;
  }
  