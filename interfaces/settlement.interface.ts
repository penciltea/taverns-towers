import { ReactNode } from "react";
import { DialogProps } from "./dialogProps.interface";
import { CommonInterface } from "./common.interface";
 
export interface SettlementDialogProps extends DialogProps {
  settlement: Settlement;
}

export interface SettlementFormTabsProps {
  tab: number;
  setTab: (tab: number) => void;
}

export interface SettlementProps {
  settlementId: string;
}

export interface SettlementAccordionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export interface SettlementResponse {
  success: boolean;
  settlements: Settlement[];
  total: number;
  currentPage: number;
  totalPages: number;
}


export interface Settlement extends CommonInterface {
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
  domains?: string[];
  holidays?: string;
  folklore?: string;
  crime?: string[];
  isPublic?: boolean;
}

export const DefaultSettlementQueryParams = {
  page: 1,
  limit: 12,
  search: '',
  size: '',
  climate: '',
  magic: '',
  wealth: '',
  tags: [],
  terrain: [],
}