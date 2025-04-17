import { LOCATION_SIZE, LOCATION_CONDITION } from '@/constants/locationOptions';

export interface LocationListProps {
  locations: 
    { image: string; 
      _id: string; 
      type: string; 
      name: string; 
      tags: string[] 
    }[];
}


export interface BaseLocation {
  _id?: string;
  townId?: string;
  name: string;
  type: string;
  size?: LocationSize;
  condition?: LocationCondition;
  owner?: string;
  publicNotes?: string;
  gmNotes?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TavernLocation extends BaseLocation {
  type: "tavern";
  clientele?: string;
  entertainment?: string;
  cost?: string;
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

export type Location = TavernLocation | TempleLocation | BlacksmithLocation | BaseLocation;

export type LocationSize = (typeof LOCATION_SIZE)[number]['value'];
export type LocationCondition = (typeof LOCATION_CONDITION)[number]['value'];
