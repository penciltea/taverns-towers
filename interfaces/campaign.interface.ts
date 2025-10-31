export interface Campaign {
    _id: string;
    userId: string;
    name: string;
    description?: string;
    genre?: string[];
    tone?: string[];
    rules?: string;
    highlights?: string[];
    links?: string[];
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    idempotencyKey?: string;
}

// Form input types
export interface PlayerInput {
    identifier: string;
    roles: string[];
}

export interface CampaignInput extends Campaign {
    players: PlayerInput[]; // form uses identifiers
}

// DB-ready types
export interface PlayerForDB {
    userId: string;
    roles: string[];
}

export interface CampaignForDB extends Campaign {
    players: PlayerForDB[]; // database uses ObjectIds
}

