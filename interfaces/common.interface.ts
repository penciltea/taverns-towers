export interface CommonInterface {
    _id: string;
    name: string;
    userId: string;
    editors: string[];
    favorite: boolean;
    isPublic: boolean;
    publicNotes?: string;
    gmNotes?: string;  
    createdAt: string;
    updatedAt: string;
}