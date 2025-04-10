export interface Town {
    _id: string;
    id: string;
    name: string;
    size: string;
    tags: string[];
    map?: string;
    terrain: string[];
    climate: string;
    magic: string;
    races: string;
    publicNotes: string;
    gmNotes: string;
    leader: string;
    rulingStyle: string;
    wealth: string;
    tradeNotes: string;
    guilds: string;
    religion: string;
    holidays: string;
    folklore: string;
    crime: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  }
  