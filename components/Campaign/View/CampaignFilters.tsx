"use client";

import { ContentFilters } from "@/store/contentStore";
import FilterBar from "@/components/Grid/FilterBar";
import { DefaultCampaignQueryParams } from "@/interfaces/campaign.interface";


type NpcFiltersProps = {
  filters: ContentFilters;
  setFilters: (newFilters: Partial<ContentFilters>) => void;
};

export default function NpcFilters({ filters, setFilters }: NpcFiltersProps) {

  return (
      <FilterBar
            filters={filters}
            setFilters={setFilters}
            clearFilters={() => {
                setFilters(DefaultCampaignQueryParams);
            }}
      >
        
      </FilterBar>
  )
}