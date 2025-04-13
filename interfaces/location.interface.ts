export interface Location {
    _id?: string;
    townId?: string;
    name: string;
    type: string;
    description?: string;
    owner?: string;
    services?: string[];
    notes?: string;
    map?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  