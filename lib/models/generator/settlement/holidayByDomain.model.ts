import mongoose from "mongoose";
import { DOMAINS, DomainTypes } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface HolidaysByDomainModel {
    domain: DomainTypes,
    holidays: string[];
}

const HolidaysByDomainSchema = new Schema<HolidaysByDomainModel>({
    domain: { type: String, enum: DOMAINS, required: true, unique: true },
    holidays: { type: [String], required: false }
});

export const HolidaysByDomain = 
    (models?.HolidaysByDomain as mongoose.Model<HolidaysByDomainModel>) ||
    model<HolidaysByDomainModel>(
        "HolidaysByDomain",
        HolidaysByDomainSchema,
        "generator_holidays_by_domain"
    )
