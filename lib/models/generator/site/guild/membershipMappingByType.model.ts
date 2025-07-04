import mongoose from "mongoose";
import { SiteGuildType, SiteGuildMembershipType } from "@/constants/site/guild.options";
import { getGuildTypes, getGuildMembershipRequirements } from "@/lib/util/siteHelpers";
const { Schema, model, models } = mongoose;

export interface MembershipByGuildTypeModel {
    guildType: SiteGuildType,
    requirements: SiteGuildMembershipType[];
}

const MembershipByGuildTypeSchema = new Schema<MembershipByGuildTypeModel>({
    guildType: { type: String, enum: getGuildTypes, required: true, unique: true },
    requirements: { type: [String], enum: getGuildMembershipRequirements, required: false }
});

export const MembershipByGuildType = 
    (models?.MembershipByGuildType as mongoose.Model<MembershipByGuildTypeModel>) ||
    model<MembershipByGuildTypeModel>(
        "MembershipByGuildType",
        MembershipByGuildTypeSchema,
        "generator_guild_membership_by_type"
    )
