import { ReactNode } from "react";
import { DialogProps } from "./dialogProps.interface";
import { CommonInterface } from "./common.interface";
import { NpcConnection } from "./connection.interface";
 
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
  rulingStyle?: string;
  military?: string[];
  wealth?: string;
  tradeNotes?: string;
  domains?: string[];
  holidays?: string;
  folklore?: string;
  crime?: string[];
  connections: NpcConnection[];
}

export const DefaultSettlementQueryParams: SettlementQueryParams = {
  page: 1,
  limit: 12,
  search: '',
  size: '',
  climate: '',
  magic: '',
  wealth: '',
  tags: [],
  terrain: []
}

export interface SettlementQueryParams {
  page: number;
  limit: number;
  search: string;
  size: string;
  climate: string;
  magic: string;
  wealth: string;
  tags: string[];
  terrain: string[];
}