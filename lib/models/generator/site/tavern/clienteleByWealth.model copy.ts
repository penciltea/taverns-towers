import mongoose from "mongoose";
import { CriminalActivityTypes, CRIMINAL_ACTIVITY_TYPES } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface ClienteleByCrimeModel {
    crime: CriminalActivityTypes;
    clientele: string[];
}

const ClienteleByCrimeSchema = new Schema<ClienteleByCrimeModel>({
    crime: { type: String, enum: CRIMINAL_ACTIVITY_TYPES, required: true, unique: true },
    clientele: { type: [String], required: true }
});

export const ClienteleByCrime = 
    (models?.ClienteleByCrime as mongoose.Model<ClienteleByCrimeModel>) ||
    model<ClienteleByCrimeModel>(
        "ClienteleByCrime",
        ClienteleByCrimeSchema,
        "generator_tavern_clientele_by_crime"
    );
