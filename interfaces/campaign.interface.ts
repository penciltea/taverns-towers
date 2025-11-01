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
    players: PlayerInput[];
}

// DB-ready types
export interface PlayerForDB {
    user: string;
    roles: string[];
}

export interface CampaignForDB extends Campaign {
    players: PlayerForDB[];
}

// For View screens
export interface PlayerForClient {
    _id: string;
    user: {
        username?: string;
        _id?: string;
        email?: string;
    }
    roles: string[];
}

export interface CampaignForClient extends Campaign {
    players: PlayerForClient[];
}

