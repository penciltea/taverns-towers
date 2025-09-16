import { groupConnections, flattenConnections, isNpcConnection, FlatConnection, GroupedConnections, NpcTypeConnection } from "./npcHelpers";
import { Npc } from "@/interfaces/npc.interface";

describe("groupConnections", () => {
    it("returns empty object if connections is undefined", () => {
        expect(groupConnections(undefined)).toEqual({});
    });

    it("groups connections by type", () => {
        const flatConnections: FlatConnection[] = [
            { type: "npc", id: "npc1", label: "Ally", role: "friend" },
            { type: "settlement", id: "settlement1", role: "leader" },
            { type: "npc", id: "npc2", label: "Rival" },
            { type: "site", id: "site1" },
        ];

        const result = groupConnections(flatConnections);

        expect(result).toEqual({
            npc: [
                { id: "npc1", label: "Ally", role: "friend" },
                { id: "npc2", label: "Rival" },
            ],
            settlement: [{ id: "settlement1", role: "leader" }],
            site: [{ id: "site1" }],
        });
    });
});

describe("flattenConnections", () => {
    it("returns empty array if grouped connections is undefined", () => {
        expect(flattenConnections(undefined)).toEqual([]);
    });

    it("flattens grouped connections back into a flat array", () => {
        const grouped: GroupedConnections = {
            npc: [
                { id: "npc1", label: "Ally", role: "friend" },
                { id: "npc2", label: "Rival" },
            ],
            settlement: [{ id: "settlement1", role: "leader" }],
            site: [{ id: "site1" }],
        };

        const result = flattenConnections(grouped);

        expect(result).toContainEqual({
            type: "npc",
            id: "npc1",
            label: "Ally",
            role: "friend",
        });
        expect(result).toContainEqual({
            type: "npc",
            id: "npc2",
            label: "Rival",
        });
        expect(result).toContainEqual({
            type: "settlement",
            id: "settlement1",
            role: "leader",
        });
        expect(result).toContainEqual({
            type: "site",
            id: "site1",
        });
    });

    it("handles empty groups gracefully", () => {
        const grouped: GroupedConnections = {
            npc: [],
            site: [{ id: "s1" }],
        };

        expect(flattenConnections(grouped)).toEqual([
            { type: "site", id: "s1" },
        ]);
    });
});

describe("isNpcConnection", () => {
    const npcData: Npc = {
        _id: "npc1",
        name: "Test NPC",
        userId: "user123",
        editors: [],
        isPublic: false,
        publicNotes: "",
        gmNotes: "",
        connections: [],
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
    };

    it("returns true for a valid NpcTypeConnection", () => {
        const conn: NpcTypeConnection = {
            type: "npc",
            id: "npc1",
            name: "Test",
            npcData,
        };

        expect(isNpcConnection(conn)).toBe(true);
    });

    it("returns false for npc without npcData", () => {
        const conn = {
            type: "npc" as const,
            id: "npc2",
            name: "Bad NPC",
        };

        expect(isNpcConnection(conn)).toBe(false);
    });

    it("returns false for non-npc types", () => {
        const conn = {
            type: "settlement" as const,
            id: "settlement1",
            name: "Town",
        };

        expect(isNpcConnection(conn)).toBe(false);
    });
});
