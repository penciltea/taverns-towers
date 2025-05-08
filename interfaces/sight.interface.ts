import { LOCATION_SIZE, LOCATION_CONDITION } from '@/constants/sightOptions';
import { DialogProps } from "./dialogProps.interface";
 
export interface SightDialogProps extends DialogProps {
  settlementId: string;
  sightData: SightType;
  onDelete: (id: string) => void;
}

export interface SightListProps {
  settlementId: string;
  onDelete: (id: string) => void;
}

export interface SightFilters {
  page: number;
  limit: number;
  settlementId: string;
  type: string[];
  search: string;
}

export const DefaultSightFilters = {
  page: 1,
  limit: 10,
  settlementId: '',
  type: [],
  search: ''
}

export interface SightResponse {
  sights: SightType[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface BaseSight {
  _id: string;
  settlementId?: string;
  name: string;
  type: string;
  size?: SightSize;
  condition?: SightCondition;
  publicNotes?: string;
  gmNotes?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TavernSight extends BaseSight {
  type: "tavern";
  owner?: string;
  clientele?: string;
  entertainment?: string;
  cost?: string;
  menu?: { name: string; description: string; price: string }[];
}

export interface TempleSight extends BaseSight {
  type: "temple";
  deity?: string;
  leader?: string;
  relics?: string;
  services?: { name: string; description: string; price: string }[];
}

export interface ShopSight extends BaseSight {
  type: "shop";
  shopType?: string;
  owner?: string;
  wares?: { name: string; description?: string; price: string }[];
}

export interface GuildSight extends BaseSight {
  type: "guild";
  guildName?: string;
  guildType?: string;
  leader?: string;
  membershipRequirements?: string;
  knownRivals?: string;
  services?: { name: string; description?: string; price: string }[];
}

export interface GovernmentSight extends BaseSight {
  type: "government";
  function?: string;
  officials?: string;
  jurisdiction?: string;
  security?: string;
}

export interface EntertainmentSight extends BaseSight {
  type: "entertainment";
  venueType?: string;
  performances?: string;
  owner?: string;
  cost?: string;
}

export interface HiddenSight extends BaseSight {
  type: "hidden";
  secrecy?: string[];
  leader?: string,
  knownTo?: string;
  defenses?: string;
  purpose?: string;
}

export interface ResidenceSight extends BaseSight {
  type: "residence";
  occupant?: string;
  notableFeatures?: string;
}

export interface MiscellaneousSight extends BaseSight {
  type: "miscellaneous";
  features?: string;
  use?: string;
}

export type SightType = TavernSight | TempleSight | ShopSight | GuildSight | GovernmentSight | EntertainmentSight | HiddenSight | ResidenceSight | MiscSight | BaseSight;

export type SightSize = (typeof LOCATION_SIZE)[number]['value'];
export type SightCondition = (typeof LOCATION_CONDITION)[number]['value'];
