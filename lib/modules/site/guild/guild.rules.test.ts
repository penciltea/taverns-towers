import { applyGuildTypeRule, applyMembershipByTypeRule, isGuildSite } from "./guild.rules";
import { GUILD_TYPES } from "@/constants/site/guild.options";
import { MembershipByGuildType } from "@/lib/models/generator/site/guild/membershipMappingByType.model";
import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { SiteFormData } from "@/schemas/site.schema";

jest.mock("@/lib/util/randomValues", () => ({
    getRandom: jest.fn((arr: string[]) => arr[0]),
    getRandomSubset: jest.fn((arr: string[], { min }: { min: number; max: number }) => arr.slice(0, min)),
}));

jest.mock("@/lib/models/generator/site/guild/membershipMappingByType.model", () => ({
    MembershipByGuildType: {
        findOne: jest.fn(),
    },
}));

type GuildTestData = Partial<SiteFormData> & { type: "guild" };

describe("Guild Site Generator", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("isGuildSite", () => {
        it("returns true if type is 'guild'", () => {
            expect(isGuildSite({ type: "guild" })).toBe(true);
        });

        it("returns false if type is not 'guild'", () => {
            expect(isGuildSite({ type: "temple" })).toBe(false);
        });
    });

    describe("applyGuildTypeRule", () => {
        it("assigns a random guildType if missing", async () => {
            const data: GuildTestData = { type: "guild" };
            const result = await applyGuildTypeRule(data) as Partial<GuildTestData>;
            const allGuildTypes = GUILD_TYPES.flatMap(c => c.options.map(o => o.value));
            expect(allGuildTypes).toContain(result.guildType);
            expect(getRandom).toHaveBeenCalled();
        });

        it("does not overwrite existing guildType", async () => {
            const data: GuildTestData = { type: "guild", guildType: "artisan" };
            const result = await applyGuildTypeRule(data) as Partial<GuildTestData>;
            expect(result.guildType).toBe("artisan");
        });

        it("returns unchanged if not guild", async () => {
            const data: Partial<SiteFormData> = { type: "temple" };
            const result = await applyGuildTypeRule(data);
            expect(result).toEqual(data);
        });
    });

    describe("applyMembershipByTypeRule", () => {
        it("fetches requirements and assigns a random subset if missing", async () => {
            (MembershipByGuildType.findOne as jest.Mock).mockReturnValue({
                lean: jest.fn().mockResolvedValue({
                    guildType: "artisan",
                    requirements: ["apprenticeship", "fee", "sponsorship"],
                }),
            });

            const data: GuildTestData = { type: "guild", guildType: "artisan", membershipRequirements: [] };
            const result = await applyMembershipByTypeRule(data) as Partial<GuildTestData>;

            expect(MembershipByGuildType.findOne).toHaveBeenCalledWith({ guildType: "artisan" });
            expect(result.membershipRequirements?.length).toBeGreaterThan(0);
            expect(getRandomSubset).toHaveBeenCalled();
        });

        it("does nothing if membershipRequirements already exist", async () => {
            const data: GuildTestData = { type: "guild", guildType: "artisan", membershipRequirements: ["fee"] };
            const result = await applyGuildTypeRule(data) as Partial<GuildTestData>;
            expect(result.membershipRequirements).toEqual(["fee"]);
        });

        it("returns unchanged if not guild", async () => {
            const data: Partial<SiteFormData> = { type: "temple" };
            const result = await applyMembershipByTypeRule(data);
            expect(result).toEqual(data);
        });

        it("returns unchanged if guildType is missing", async () => {
            const data: GuildTestData = { type: "guild" };
            const result = await applyMembershipByTypeRule(data);
            expect(result).toEqual(data);
        });
    });

    describe("generateGuildData", () => {
        it("produces guild site data with type, guildType, and membershipRequirements", async () => {
            (MembershipByGuildType.findOne as jest.Mock).mockReturnValue({
                lean: jest.fn().mockResolvedValue({
                    guildType: "artisan",
                    requirements: ["apprenticeship", "fee"],
                }),
            });

            const input: Partial<GuildTestData> = { type: "guild" };
            let result = await applyGuildTypeRule(input) as Partial<GuildTestData>;
            result = await applyMembershipByTypeRule(result) as Partial<GuildTestData>;

            expect(result.type).toBe("guild");
            expect(result.guildType).toBeDefined();
            expect(result.membershipRequirements?.length).toBeGreaterThan(0);
        });
    });
});
