import { Types } from "mongoose";

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
    players: Player[];
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    idempotencyKey?: string;
}

export interface Player {
    userId: Types.ObjectId;
    roles: string[];
}