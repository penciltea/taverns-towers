export interface BaseLocation {
  _id?: string;
  townId?: string;
  name: string;
  type: string;
  description?: string;
  owner?: string;
  publicNotes?: string;
  gmNotes?: string;
  map?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TavernLocation extends BaseLocation {
  type: "tavern";
  menu?: string[];
  roomsAvailable?: number;
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
