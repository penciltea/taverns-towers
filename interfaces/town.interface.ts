import { ReactNode } from "react";
import { DialogProps } from "./dialogProps.interface";
import { CommonInterface } from "./common.interface";
 
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

export interface TownResponse {
  success: boolean;
  towns: Town[];
  total: number;
  currentPage: number;
  totalPages: number;
}


export interface Town extends CommonInterface {
  size?: string;
  tags?: string[];
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
}

export const DefaultTownQueryParams = {
  page: 1,
  limit: 10,
  search: '',
  size: '',
  climate: '',
  magic: '',
  wealth: '',
  tags: [],
  terrain: [],
}