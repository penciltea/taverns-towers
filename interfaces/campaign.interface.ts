export interface Campaign {
    _id: string;
    userId: string;
    name: string;
    description?: string;
    tone?: string[];
    players: Player[];
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    idempotencyKey?: string;
}

export interface Player {
    userId: string;
    role: "editor" | "viewer";
}