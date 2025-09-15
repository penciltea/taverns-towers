import findDeletedConnections from "@/lib/util/findDeletedConnections";
import { NpcConnection } from "@/interfaces/connection.interface";

describe("findDeletedConnections", () => {
    it("returns connections removed in current array", () => {
        const initial: NpcConnection[] = [
            { id: "1", type: "settlement", role: "ally" },
            { id: "2", type: "npc", role: "rival" },
            { id: "3", type: "npc", role: "friend" },
        ];

        const current: NpcConnection[] = [
            { id: "2", type: "npc", role: "rival" },
        ];

        const deleted = findDeletedConnections(initial, current);
        expect(deleted).toEqual([
            { id: "1", type: "settlement", role: "ally" },
            { id: "3", type: "npc", role: "friend" },
        ]);
    });

    it("returns empty array if nothing was deleted", () => {
        const initial: NpcConnection[] = [
            { id: "1", type: "settlement", role: "ally" },
        ];
        const current: NpcConnection[] = [
            { id: "1", type: "settlement", role: "ally" },
        ];

        const deleted = findDeletedConnections(initial, current);
        expect(deleted).toEqual([]);
    });

    it("returns all initial connections if current is empty", () => {
        const initial: NpcConnection[] = [
            { id: "1", type: "npc", role: "rival" },
            { id: "2", type: "settlement", role: "ally" },
        ];
        const current: NpcConnection[] = [];

        const deleted = findDeletedConnections(initial, current);
        expect(deleted).toEqual(initial);
    });

    it("handles empty initial array", () => {
        const initial: NpcConnection[] = [];
        const current: NpcConnection[] = [
            { id: "1", type: "npc", role: "rival" },
        ];

        const deleted = findDeletedConnections(initial, current);
        expect(deleted).toEqual([]);
    });

    it("handles completely disjoint arrays", () => {
        const initial: NpcConnection[] = [
            { id: "1", type: "npc", role: "rival" },
        ];
        const current: NpcConnection[] = [
            { id: "2", type: "settlement", role: "ally" },
        ];

        const deleted = findDeletedConnections(initial, current);
        expect(deleted).toEqual(initial);
    });

    it("works with duplicate IDs in current array", () => {
        const initial: NpcConnection[] = [
            { id: "1", type: "npc", role: "rival" },
            { id: "2", type: "settlement", role: "ally" },
        ];
        const current: NpcConnection[] = [
            { id: "2", type: "settlement", role: "ally" },
            { id: "2", type: "settlement", role: "ally" },
        ];

        const deleted = findDeletedConnections(initial, current);
        expect(deleted).toEqual([{ id: "1", type: "npc", role: "rival" }]);
    });
});
