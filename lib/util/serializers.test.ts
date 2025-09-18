import { serializeSettlement, serializeSite, serializeNpc } from "@/lib/util/serializers";
import * as serializeModule from "@/lib/util/serializeFromDb";
import { NpcConnection } from "@/interfaces/connection.interface";
import { BaseSite, TavernSite, ShopSite, GuildSite, TempleSite, GovernmentSite, EntertainmentSite, HiddenSite, ResidenceSite, MiscellaneousSite } from "@/interfaces/site.interface";

jest.mock("@/lib/util/serializeFromDb");

type SerializeInput = Parameters<typeof serializeModule.serializeFromDb>[0];

describe("Serialization utils", () => {
    const mockConnection: NpcConnection = { id: "123", type: "npc", role: "friend" };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("serializeSettlement", () => {
        it("maps connections ids to string", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "settlement1",
                name: "Test Settlement",
                connections: [{ ...mockConnection, id: 123 }],
            });

            const result = serializeSettlement({} as SerializeInput);

            expect(result.connections[0].id).toBe("123");
            expect(result.name).toBe("Test Settlement");
        });

        it("throws error if connections missing", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "settlement1",
                name: "Bad Settlement",
            });

            expect(() => serializeSettlement({} as SerializeInput)).toThrow(
                "Invalid settlement data for serialization"
            );
        });
    });

    describe("serializeSite", () => {
        it("returns default base site if type unrecognized", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "site1",
                name: "Unknown Site",
                type: "alien",
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as BaseSite;
            expect(result.type).toBe("alien");
            expect(result.connections).toEqual([]);
        });

        it("serializes tavern site correctly", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "tavern1",
                name: "My Tavern",
                type: "tavern",
                clientele: "Adventurers",
                entertainment: ["music"],
                cost: "High",
                menu: [{ name: "Ale", category: "Drink", description: "Strong", price: "5" }],
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as TavernSite;

            expect(result.type).toBe("tavern");
            expect(result.menu!).toHaveLength(1);
            expect(result.menu![0].name).toBe("Ale");
            expect(result.clientele).toBe("Adventurers");
        });

        it("serializes shop site menu correctly", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "shop1",
                name: "Magic Shop",
                type: "shop",
                shopType: "generalStore",
                menu: [{ name: "Potion", category: "Item", description: "Healing", price: "10" }],
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as ShopSite;

            expect(result.type).toBe("shop");
            expect(result.shopType).toBe("generalStore");
            expect(result.menu!).toHaveLength(1);
            expect(result.menu![0].name).toBe("Potion");
        });

        it("serializes guild site membershipRequirements", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "guild1",
                name: "Thieves Guild",
                type: "guild",
                guildName: "Shadow Hand",
                guildType: "Criminal",
                membershipRequirements: [1, 2],
                knownRivals: "City Guard",
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as GuildSite;

            expect(result.membershipRequirements).toEqual(["1", "2"]);
            expect(result.guildName).toBe("Shadow Hand");
        });

        it("serializes temple site correctly", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "temple1",
                name: "Grand Temple",
                type: "temple",
                domains: ["Life", "Light"],
                relics: ["Holy Sword"],
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as TempleSite;

            expect(result.type).toBe("temple");
            expect(result.domains).toEqual(["Life", "Light"]);
            expect(result.relics).toEqual(["Holy Sword"]);
        });

        it("serializes government site correctly", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "gov1",
                name: "City Hall",
                type: "government",
                function: "Administration",
                security: "High",
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as GovernmentSite;

            expect(result.type).toBe("government");
            expect(result.function).toBe("Administration");
            expect(result.security).toBe("High");
        });

        it("serializes entertainment site correctly", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "ent1",
                name: "Grand Arena",
                type: "entertainment",
                venueType: "Arena",
                cost: "High",
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as EntertainmentSite;

            expect(result.type).toBe("entertainment");
            expect(result.venueType).toBe("Arena");
            expect(result.cost).toBe("High");
        });

        it("serializes hidden site correctly", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "hidden1",
                name: "Secret Lair",
                type: "hidden",
                secrecy: ["Underground", "Locked"],
                knownTo: ["NPC1"],
                defenses: "Traps",
                purpose: "Hide treasure",
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as HiddenSite;

            expect(result.type).toBe("hidden");
            expect(result.secrecy).toEqual(["Underground", "Locked"]);
            expect(result.knownTo).toEqual(["NPC1"]);
            expect(result.defenses).toBe("Traps");
            expect(result.purpose).toBe("Hide treasure");
        });

        it("serializes residence site correctly", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "res1",
                name: "Castle",
                type: "residence",
                notableFeatures: ["Moat", "Towers"],
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as ResidenceSite;

            expect(result.type).toBe("residence");
            expect(result.notableFeatures).toEqual(["Moat", "Towers"]);
        });

        it("serializes miscellaneous site correctly", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "misc1",
                name: "Weird Site",
                type: "miscellaneous",
                features: ["Strange artifact"],
                use: "Unknown",
                connections: [],
            });

            const result = serializeSite({} as SerializeInput) as MiscellaneousSite;

            expect(result.type).toBe("miscellaneous");
            expect(result.features).toEqual(["Strange artifact"]);
            expect(result.use).toBe("Unknown");
            });

            it("throws error if serialized data is invalid", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue(null);

            expect(() => serializeSite({} as SerializeInput)).toThrow("Invalid serialized site data");
        });
    });

    describe("serializeNpc", () => {
        it("maps connections ids to string", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "npc1",
                name: "Test NPC",
                connections: [{ ...mockConnection, id: 456 }],
            });

            const result = serializeNpc({} as SerializeInput);
            expect(result.connections[0].id).toBe("456");
            expect(result.name).toBe("Test NPC");
        });

        it("throws error if connections missing", () => {
            (serializeModule.serializeFromDb as jest.Mock).mockReturnValue({
                _id: "npc1",
                name: "No Connections",
            });

            expect(() => serializeNpc({} as SerializeInput)).toThrow("Invalid NPC data for serialization");
        });
    });
});