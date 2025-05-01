import { LOCATION_SIZE, LOCATION_CONDITION } from '@/constants/locationOptions';
import { DialogProps } from "./dialogProps.interface";
 
export interface LocationDialogProps extends DialogProps {
  settlementId: string;
  locationData: LocationType;
  onDelete: (id: string) => void;
}

export interface LocationListProps {
  settlementId: string;
  onDelete: (id: string) => void;
}

export interface LocationFilters {
  page: number;
  limit: number;
  settlementId: string;
  type: string[];
  search: string;
}

export const DefaultLocationFilters = {
  page: 1,
  limit: 10,
  settlementId: '',
  type: [],
  search: ''
}

export interface LocationResponse {
  locations: LocationType[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface BaseLocation {
  _id: string;
  settlementId?: string;
  name: string;
  type: string;
  size?: LocationSize;
  condition?: LocationCondition;
  publicNotes?: string;
  gmNotes?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TavernLocation extends BaseLocation {
  type: "tavern";
  owner?: string;
  clientele?: string;
  entertainment?: string;
  cost?: string;
  menu?: { name: string; description: string; price: string }[];
}

export interface TempleLocation extends BaseLocation {
  type: "temple";
  deity?: string;
  leader?: string;
  relics?: string;
  services?: { name: string; description: string; price: string }[];
}

export interface ShopLocation extends BaseLocation {
  type: "shop";
  shopType?: string;
  owner?: string;
  wares?: { name: string; description?: string; price: string }[];
}

export interface GuildLocation extends BaseLocation {
  type: "guild";
  guildName?: string;
  guildType?: string;
  leader?: string;
  membershipRequirements?: string;
  knownRivals?: string;
  services?: { name: string; description?: string; price: string }[];
}

export interface GovernmentLocation extends BaseLocation {
  type: "government";
  function?: string;
  officials?: string;
  jurisdiction?: string;
  security?: string;
}

export interface EntertainmentLocation extends BaseLocation {
  type: "entertainment";
  venueType?: string;
  performances?: string;
  owner?: string;
  cost?: string;
}

export interface HiddenLocation extends BaseLocation {
  type: "hidden";
  secrecy?: string[];
  leader?: string,
  knownTo?: string;
  defenses?: string;
  purpose?: string;
}

export interface ResidenceLocation extends BaseLocation {
  type: "residence";
  occupant?: string;
  notableFeatures?: string;
}

export interface MiscellaneousLocation extends BaseLocation {
  type: "miscellaneous";
  features?: string;
  use?: string;
}

export type LocationType = TavernLocation | TempleLocation | ShopLocation | GuildLocation | GovernmentLocation | EntertainmentLocation | HiddenLocation | ResidenceLocation | MiscLocation | BaseLocation;

export type LocationSize = (typeof LOCATION_SIZE)[number]['value'];
export type LocationCondition = (typeof LOCATION_CONDITION)[number]['value'];
