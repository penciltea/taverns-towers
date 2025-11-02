"use client";

import { ContentFilters } from "@/store/contentStore";
import SelectInput from "@/components/Common/SelectInput";
import FilterBar from "@/components/Grid/FilterBar";
import { DefaultCampaignQueryParams } from "@/interfaces/campaign.interface";
import { TONE } from "@/constants/common.options";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { GENRES } from "@/constants/campaign.options";
import { FormChipSelect } from "@/components/Form";


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
        <SelectInput
            label="Tone"
            value={filters.tone != null ? filters.tone.toString() : ""}
            onChange={(e) =>
                setFilters({ tone: e.target.value })
            }
            options={toSelectOptions(TONE)}
        />

        <FormChipSelect
            name="genre"
            label="Genre"
            options={[...GENRES]}
        />
        
      </FilterBar>
  )
}