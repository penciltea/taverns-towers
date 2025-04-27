import { LOCATION_SIZE, LOCATION_CONDITION } from '@/constants/locationOptions';
import { DialogProps } from "./dialogProps.interface";
import { CommonInterface } from "./common.interface";
 
export interface LocationDialogProps extends DialogProps {
  townId: string;
  locationData: LocationType;
  onDelete: (id: string) => void;
}

export interface LocationListProps {
  locations: LocationType[];
  onDelete: (id: string) => void;
}


export interface BaseLocation {
  _id?: string;
  townId?: string;
  name: string;
  type: string;
  size?: LocationSize;
  condition?: LocationCondition;
  publicNotes?: string;
  gmNotes?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
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
  rituals?: string;
}

export interface BlacksmithLocation extends BaseLocation {
  type: "blacksmith";
  weaponsOffered?: string[];
  armorTypes?: string[];
}

export type LocationType = TavernLocation | TempleLocation | BlacksmithLocation | BaseLocation;

export type LocationSize = (typeof LOCATION_SIZE)[number]['value'];
export type LocationCondition = (typeof LOCATION_CONDITION)[number]['value'];
