import { CommonInterface } from "./common.interface";

export interface Campaign extends CommonInterface {
    description?: string;
    genre?: string[];
    tone?: string[];
    rules?: string;
    highlights?: string[];
    links?: string[];
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
    user?: string;
    roles: string[];
    placeholder?: boolean;
    identifier?: string;
    _id?: string;
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
        id?: string;
        email?: string;
    }
    placeholder?: boolean;
    identifier?: string;
    roles: string[];
}

export interface CampaignForClient extends Campaign {
    players: PlayerForClient[];
}

export interface CampaignQueryParams {
    page: number;
    limit: number;
    search: string;
    tone: string[];
    genre: string[];
}

export const DefaultCampaignQueryParams: CampaignQueryParams = {
    page: 1,
    limit: 12,
    search: '',
    tone: [],
    genre: []
}

export interface CampaignPermissions {
  canView: boolean;
  canEditCampaign: boolean;
  canManageSettlements: boolean;
  canManageSites: boolean;
  canManageNpcs: boolean;
  isOwner: boolean;
};