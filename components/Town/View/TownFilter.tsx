"use client";

import SelectInput from "@/components/Common/SelectInput";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { SIZE_TYPES } from "@/constants/townOptions";
import { useTownContentStore } from "@/store/townStore";
import { Town } from "@/interfaces/town.interface";
import FilterBar from "@/components/Grid/FilterBar";
import { ContentFilters } from "@/store/contentStore";

const townFilterFn = (item: Town, filters: ContentFilters): boolean => {
  const matchesSearch =
    !filters.search || item.name?.toLowerCase().includes(filters.search.toLowerCase());

  const matchesSize =
    !filters.size || item.size === filters.size;

  const matchesClimate =
    !filters.climate || item.climate === filters.climate;

  const matchesTags =
    !filters.tags || filters.tags.every((tag: string) => item.tags?.includes(tag));

  return matchesSearch && matchesSize && matchesClimate && matchesTags;
};

export default function TownFilters() {
  const { filters, applyFilters, clearFilters } = useTownContentStore();

  return (
    <FilterBar
      filters={filters}
      applyFilters={applyFilters}
      clearFilters={clearFilters}
      filterFn={townFilterFn}
      onOpenAdvanced={() => { /* open dialog */ }}
    >
      <SelectInput
        label="Size"
        value={filters.size || ""}
        onChange={(e) =>
          applyFilters({ ...filters, size: e.target.value }, townFilterFn)
        }
        options={toSelectOptions(SIZE_TYPES)}
      />
    </FilterBar>
  );
}