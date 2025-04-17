import { ReactNode } from "react";
import { DialogProps } from "./dialogProps.interface";
 
export interface TownDialogProps extends DialogProps {
  town: Town;
}

export interface TownFormTabsProps {
  tab: number;
  setTab: (tab: number) => void;
}

export interface TownProps {
  townId: string;
}


export interface TownAccordionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export interface Town {
    _id: string;
    id: string;
    name: string;
    size: string;
    tags: string[];
    map?: string;
    terrain?: string[];
    climate?: string;
    magic?: string;
    races?: string;
    publicNotes?: string;
    gmNotes?: string;
    leader?: string;
    rulingStyle?: string;
    wealth?: string;
    tradeNotes?: string;
    guilds?: string;
    religion?: string;
    holidays?: string;
    folklore?: string;
    crime?: string[];
    isPublic?: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  }

  export interface TownFilterProps {
    filters: {
      search: string;
      size: string;
      climate: string;
      tags: string[];
      // Add other inline filter fields as needed
    };
    setFilters: (filters: Partial<TownFilterProps["filters"]>) => void;
  }
 