import {  isValidSiteCategory, createSiteGenerator, getShopTypes, getGuildTypes, getGuildMembershipRequirements, getCategoryOptions, siteTypeHasMenu, mapSiteToForm } from "@/lib/util/siteHelpers";
import { SITE_CATEGORIES, SHOP_TYPE_CATEGORIES, SiteShopType } from "@/constants/site/site.options";
import { GUILD_MEMBERSHIP_REQUIREMENTS, GUILD_TYPES, SiteGuildType } from "@/constants/site/guild.options";
import { TavernSite, TempleSite, ShopSite, SiteType, GovernmentSite, GuildSite, EntertainmentSite, HiddenSite, MiscellaneousSite, ResidenceSite } from "@/interfaces/site.interface";
import { NpcConnection } from "@/interfaces/connection.interface";

describe("site.helpers", () => {

    describe("isValidSiteCategory", () => {
        it("returns true for valid category", () => {
            const category = SITE_CATEGORIES[0].value;
            expect(isValidSiteCategory(category)).toBe(true);
        });

        it("returns false for invalid category", () => {
            expect(isValidSiteCategory("invalid-category")).toBe(false);
            expect(isValidSiteCategory(null)).toBe(false);
        });

        it("returns false for undefined input", () => {
            expect(isValidSiteCategory(undefined as unknown as string)).toBe(false);
        });
    });

    describe("createSiteGenerator", () => {
        it("applies rules in order and merges results", async () => {
            type TestSite = { type: "tavern"; name?: string; cost?: string };
            const rules = [
                async (data: TestSite) => ({ ...data, name: "Rule1" }),
                async (data: TestSite) => ({ ...data, cost: "Rule2" }),
            ];

            const generator = createSiteGenerator("tavern", rules);

            const result = await generator({ overrides: { name: "Base" } });
            expect(result.type).toBe("tavern");
            expect(result.name).toBe("Rule1"); // First rule overrides
            expect(result.cost).toBe("Rule2"); // Second rule applied
        });

        it("returns base object if no rules provided", async () => {
            const generator = createSiteGenerator("tavern", []);
            const result = await generator({ overrides: { name: "Base" } });
            expect(result).toEqual({ type: "tavern", name: "Base" });
        });

        it("handles empty overrides", async () => {
            const generator = createSiteGenerator("tavern", []);
            const result = await generator({});
            expect(result).toEqual({ type: "tavern" });
        });
    });

    describe("getShopTypes", () => {
        it("flattens shop type categories correctly", () => {
            const expected = SHOP_TYPE_CATEGORIES.flatMap(group => group.options.map(o => o.value));
            expect(getShopTypes).toEqual(expected);
        });
    });

    describe("getGuildTypes", () => {
        it("flattens guild types correctly", () => {
            const expected = GUILD_TYPES.flatMap(group => group.options.map(o => o.value));
            expect(getGuildTypes).toEqual(expected);
        });
    });

    describe("getGuildMembershipRequirements", () => {
        it("flattens membership requirements correctly", () => {
            const expected = GUILD_MEMBERSHIP_REQUIREMENTS.flatMap(group => group.options.map(o => o.value));
            expect(getGuildMembershipRequirements).toEqual(expected);
        });
    });

    describe("getCategoryOptions", () => {
        it("returns categories for simple siteType array", () => {
            const categories = getCategoryOptions("temple");
            expect(categories).toContain("Other");
        });

        it("returns shop categories when shopType is provided", () => {
            const shopType = SHOP_TYPE_CATEGORIES[0].options[0].value;
            const categories = getCategoryOptions("shop", shopType);
            expect(categories).toContain("Other");
        });

        it("adds fallback category if missing", () => {
            const fallback = "Other";
            const categories = getCategoryOptions("temple", undefined, fallback);
            expect(categories).toContain(fallback);
            expect(categories[categories.length - 1]).toBe("Other");
        });

        it("returns empty array with 'Other' if siteType not found", () => {
            const categories = getCategoryOptions("nonexistent");
            expect(categories).toEqual(["Other"]);
        });

        it("does not duplicate fallbackCategory if already included", () => {
            const fallback = "Food";
            const categories = getCategoryOptions("temple", undefined, fallback);
            expect(categories.filter(c => c === fallback).length).toBe(1);
            expect(categories[categories.length - 1]).toBe("Food");
        });

        it("handles shopType provided but entry is not an object", () => {
            // This mocks a scenario where MENU_CATEGORY_OPTIONS_BY_SITE["shop"] is an array instead of object
            const categories = getCategoryOptions("temple", "anyShop");
            expect(categories).toContain("Other");
        });

        it("uses entry array path", () => {
            const categories = getCategoryOptions("temple");
            expect(Array.isArray(categories)).toBe(true);
        });

        it("uses object path but shopType missing", () => {
            const categories = getCategoryOptions("shop"); // shopType undefined
            expect(categories).toContain("Other");
        });

        it("entry[shopType.toLowerCase()] exists", () => {
            const shopType = SHOP_TYPE_CATEGORIES[0].options[0].value;
            const categories = getCategoryOptions("shop", shopType);
            expect(categories).toContain("Other"); // ensures object path used
        });

        it("fallbackCategory provided but already included", () => {
            const fallback = "Other";
            const categories = getCategoryOptions("temple", undefined, fallback);
            // branch where fallbackCategory !== "Other" is false
            expect(categories.filter(c => c === "Other").length).toBe(1);
        });

        it("fallbackCategory provided and not in categories", () => {
            const fallback = "Food";
            const categories = getCategoryOptions("temple", undefined, fallback);
            expect(categories[categories.length - 1]).toBe(fallback);
        });

        it("adds 'Other' if missing", () => {
            const categories = getCategoryOptions("nonexistent"); // entry undefined
            expect(categories).toEqual(["Other"]);
        });

        it("returns empty array plus Other when shopType not in entry object", () => {
            const nonExistentShopType = "doesNotExist";
            const categories = getCategoryOptions("shop", nonExistentShopType);
            expect(categories).toEqual(["Other"]); // hits ?? branch
        });

        it("does not add fallbackCategory if it is 'Other'", () => {
            const categories = getCategoryOptions("temple", undefined, "Other");
            // 'Other' should already be included; no duplicates
            expect(categories.filter(c => c === "Other").length).toBe(1);
        });
    });

    describe("siteTypeHasMenu", () => {
        it("returns true for supported site types", () => {
            expect(siteTypeHasMenu("shop")).toBe(true);
            expect(siteTypeHasMenu("tavern")).toBe(true);
            expect(siteTypeHasMenu("guild")).toBe(true);
            expect(siteTypeHasMenu("temple")).toBe(true);
        });

        it("returns false for unsupported site types", () => {
            expect(siteTypeHasMenu("residence")).toBe(false);
            expect(siteTypeHasMenu(undefined)).toBe(false);
        });

        it("returns false for empty string", () => {
            expect(siteTypeHasMenu("")).toBe(false);
        });
    });

    describe("mapSiteToForm", () => {
        const baseConnections = [{ id: "1", type: "npc", role: "friend" }] as NpcConnection[];
        const standardFields = { _id: "123", createdAt: new Date().toString(), updatedAt: new Date().toString(), userId: "userID", editors: [], isPublic: true}

        it("maps tavern site correctly", () => {
            const site: TavernSite = { ...standardFields, type: "tavern", name: "TavernTest", clientele: "Adventurers", entertainment: [], cost: "High", menu: [], connections: baseConnections };
            const form = mapSiteToForm(site);
            expect(form?.type).toBe("tavern");
            expect(form?.name).toBe("TavernTest");
            expect(form?.connections).toEqual(baseConnections);
        });

        it("maps temple site correctly", () => {
            const site: TempleSite = { ...standardFields, type: "temple", name: "TempleTest", size: "Large", condition: "Good", domains: [], relics: "Holy Relic", menu: [], connections: baseConnections };
            const form = mapSiteToForm(site) as Partial<TempleSite>;
            expect(form?.type).toBe("temple");
            expect(form?.name).toBe("TempleTest");
            expect(form?.relics).toBe("Holy Relic");
        });

        it("maps a ShopSite correctly", () => {
            const shop: ShopSite = {
                ...standardFields,
                type: "shop",
                name: "Magic Shop",
                shopType: "generalStore" as SiteShopType,
                size: "Medium",
                condition: "Good",
                menu: [],
                connections: baseConnections,
            };

            const form = mapSiteToForm(shop);
            expect(form?.type).toBe("shop");
            expect(form?.name).toBe("Magic Shop");
            expect((form as ShopSite).shopType).toBe("generalStore");
            expect(form?.connections).toEqual(baseConnections);
        });

        it("maps a GuildSite correctly", () => {
            const guild: GuildSite = {
                ...standardFields,
                type: "guild",
                name: "Thieves Guild",
                guildType: "Criminal",
                guildName: "Shadow Hand",
                membershipRequirements: ["Stealth"],
                knownRivals: "City Guard",
                menu: [],
                connections: baseConnections,
            };

            const form = mapSiteToForm(guild);
            expect(form?.type).toBe("guild");
            expect(form?.name).toBe("Thieves Guild");
            expect((form as GuildSite).guildType).toBe("Criminal");
            expect((form as GuildSite).membershipRequirements).toEqual(["Stealth"]);
            expect(form?.connections).toEqual(baseConnections);
        });

        it("maps a GovernmentSite correctly", () => {
            const government: GovernmentSite = {
                ...standardFields,
                type: "government",
                name: "Town Hall",
                function: "Administration",
                security: "High",
                connections: baseConnections,
            };

            const form = mapSiteToForm(government);
            expect(form?.type).toBe("government");
            expect(form?.name).toBe("Town Hall");
            expect((form as GovernmentSite).function).toBe("Administration");
            expect((form as GovernmentSite).security).toBe("High");
            expect(form?.connections).toEqual(baseConnections);
        });

        it("maps an EntertainmentSite correctly", () => {
            const entertainment: EntertainmentSite = {
                ...standardFields,
                type: "entertainment",
                name: "Grand Theater",
                venueType: "Theater",
                cost: "High",
                connections: baseConnections,
            };

            const form = mapSiteToForm(entertainment);
            expect(form?.type).toBe("entertainment");
            expect(form?.name).toBe("Grand Theater");
            expect((form as EntertainmentSite).venueType).toBe("Theater");
            expect(form?.connections).toEqual(baseConnections);
        });

        it("maps a HiddenSite correctly", () => {
            const hidden: HiddenSite = {
                ...standardFields,
                type: "hidden",
                name: "Secret Lair",
                secrecy: ["High"],
                knownTo: ["Rogue"],
                defenses: ["Traps"],
                purpose: ["Hide treasure"],
                connections: baseConnections,
            };

            const form = mapSiteToForm(hidden);
            expect(form?.type).toBe("hidden");
            expect(form?.name).toBe("Secret Lair");
            expect((form as HiddenSite).secrecy).toEqual(["High"]);
            expect(form?.connections).toEqual(baseConnections);
        });

        it("maps a ResidenceSite correctly", () => {
            const residence: ResidenceSite = {
                ...standardFields,
                type: "residence",
                name: "Mayor's House",
                notableFeatures: "Garden",
                connections: baseConnections,
            };

            const form = mapSiteToForm(residence);
            expect(form?.type).toBe("residence");
            expect(form?.name).toBe("Mayor's House");
            expect((form as ResidenceSite).notableFeatures).toBe("Garden");
            expect(form?.connections).toEqual(baseConnections);
        });

        it("maps a MiscellaneousSite correctly", () => {
            const misc: MiscellaneousSite = {
                ...standardFields,
                type: "miscellaneous",
                name: "Old Mill",
                features: "Rusty gears",
                use: "Grinding",
                connections: baseConnections,
            };

            const form = mapSiteToForm(misc);
            expect(form?.type).toBe("miscellaneous");
            expect(form?.name).toBe("Old Mill");
            expect((form as MiscellaneousSite).features).toBe("Rusty gears");
            expect(form?.connections).toEqual(baseConnections);
        });

        it("returns null for unknown type", () => {
            const site = { type: "unknown" } as SiteType;
            const form = mapSiteToForm(site);
            expect(form).toBeNull();
        });

        it("maps ShopSite with missing optional fields", () => {
            const shop: Partial<ShopSite> = { type: "shop", name: "Tiny Shop", shopType: "generalStore" as SiteShopType, connections: [] };
            const form = mapSiteToForm(shop as ShopSite);
            expect(form).toBeTruthy();
            expect(form?.type).toBe("shop");
            expect(form?.size).toBe(""); // defaults to empty string
            expect(form?.condition).toBe("");
        });

        it("maps HiddenSite with undefined arrays", () => {
            const hidden: HiddenSite = { ...standardFields, type: "hidden", name: "Mysterious Cave", connections: [] };
            const form = mapSiteToForm(hidden) as Partial<HiddenSite>;
            expect(form?.secrecy).toEqual([]);
            expect(form?.knownTo).toEqual([]);
            expect(form?.defenses).toEqual([]);
            expect(form?.purpose).toEqual([]);
        });

        it("calls default branch for unknown site type", () => {
            const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
            const site = { type: "alien" } as SiteType;
            const form = mapSiteToForm(site);
            expect(form).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith("Unknown site type", "alien");
            consoleSpy.mockRestore();
        });

        it("ShopSite with missing optional fields hits ?? branches", () => {
            const shop: Partial<ShopSite> = { type: "shop", name: "Empty Shop", shopType: "generalStore" as SiteShopType, connections: [] };
            const form = mapSiteToForm(shop as ShopSite);
            expect(form?.size).toBe("");
            expect(form?.condition).toBe("");
        });

        it("HiddenSite with undefined arrays hits ?? branches", () => {
            const hidden: Partial<HiddenSite> = { type: "hidden", name: "Mysterious", connections: [] };
            const form = mapSiteToForm(hidden as HiddenSite) as Partial<HiddenSite>;
            expect(form?.secrecy).toEqual([]);
            expect(form?.knownTo).toEqual([]);
            expect(form?.defenses).toEqual([]);
            expect(form?.purpose).toEqual([]);
        });

        it("GovernmentSite optional fields missing", () => {
            const gov: GovernmentSite = { ...standardFields, type: "government", name: "Gov", connections: [] };
            const form = mapSiteToForm(gov) as Partial<GovernmentSite>;
            expect(form?.function).toBe("");
            expect(form?.security).toBe("");
        });

        it("EntertainmentSite optional fields missing", () => {
            const ent: EntertainmentSite = { ...standardFields, type: "entertainment", name: "Stage", connections: [] };
            const form = mapSiteToForm(ent) as EntertainmentSite;
            expect(form?.venueType).toBe("");
            expect(form?.cost).toBe("");
        });

        it("handles missing connections array for ShopSite", () => {
            const site: Partial<ShopSite> = { type: "shop", name: "NoConnections", shopType: "generalStore" as SiteShopType };
            const form = mapSiteToForm(site as ShopSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles missing connections array for GuildSite", () => {
            const site: Partial<GuildSite> = { type: "guild", name: "NoConnections", guildType: "thief" as SiteGuildType };
            const form = mapSiteToForm(site as GuildSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles missing connections array for TavernSite", () => {
            const site: Partial<TavernSite> = { type: "tavern", name: "NoConnections" };
            const form = mapSiteToForm(site as TavernSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles missing connections array for TempleSite", () => {
            const site: Partial<TempleSite> = { type: "temple", name: "NoConnections", domains: [] };
            const form = mapSiteToForm(site as TempleSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles missing connections array for HiddenSite", () => {
            const site: Partial<HiddenSite> = { type: "hidden", name: "NoConnections" };
            const form = mapSiteToForm(site as HiddenSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles missing connections array for GovernmentSite", () => {
            const site: Partial<GovernmentSite> = { type: "government", name: "NoConnections" };
            const form = mapSiteToForm(site as GovernmentSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles missing connections array for ResidenceSite", () => {
            const site: Partial<ResidenceSite> = { type: "residence", name: "NoConnections" };
            const form = mapSiteToForm(site as ResidenceSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles missing connections array for EntertainmentSite", () => {
            const site: Partial<EntertainmentSite> = { type: "entertainment", name: "NoConnections" };
            const form = mapSiteToForm(site as EntertainmentSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles missing connections array for MiscellaneousSite", () => {
            const site: Partial<MiscellaneousSite> = { type: "miscellaneous", name: "NoConnections" };
            const form = mapSiteToForm(site as MiscellaneousSite);
            expect(form?.connections).toEqual([]); // hits default ?? branch
        });

        it("handles undefined menu array for TavernSite", () => {
            const site: TavernSite = { ...standardFields, type: "tavern", name: "NoMenu", connections: [] };
            const form = mapSiteToForm(site) as Partial<TavernSite>;
            expect(form?.menu).toEqual([]);
        });

        it("handles undefined menu array for TempleSite", () => {
            const site: TempleSite = { ...standardFields, type: "temple", name: "NoMenu", connections: [], domains: [] };
            const form = mapSiteToForm(site) as Partial<TempleSite>;
            expect(form?.menu).toEqual([]);
        });

        it("handles undefined menu array for ShopSite", () => {
            const site: ShopSite = { 
                ...standardFields, 
                type: "shop", 
                name: "NoMenu", 
                connections: [], 
                shopType: "generalStore" as SiteShopType 
            };

            const form = mapSiteToForm(site);

            if (form?.type === "shop") {
                expect(form.menu).toEqual([]);
            } else {
                fail("Expected a ShopSite form");
            }
        });

        it("handles undefined menu array for GuildSite", () => {
            const site: GuildSite = { 
                ...standardFields, 
                type: "guild", 
                name: "NoMenu", 
                connections: [], 
                guildType: "thieves" as SiteGuildType 
            };

            const form = mapSiteToForm(site);

            if (form?.type === "guild") {
                expect(form.menu).toEqual([]);
            } else {
                fail("Expected a Guild form");
            }
        });
    });
});
