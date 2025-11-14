export interface CommonInterface {
    _id: string;
    name: string;
    userId: string;
    campaignId?: string;
    editors?: string[];
    favorite?: boolean;
    campaignHighlight?: boolean;
    isPublic: boolean;
    publicNotes?: string;
    gmNotes?: string;  
    createdAt: string;
    updatedAt: string;
    idempotencyKey?: string;
}