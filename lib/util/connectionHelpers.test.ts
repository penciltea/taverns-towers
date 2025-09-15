import { ObjectId } from "bson";
import { normalizeConnections, serializeConnections, serializeConnectionsForClient, serializeNpcForClient, serializeSettlementForClient, toISOStringSafe, toStringId } from "@/lib/util/connectionHelpers";
import { Npc } from "@/interfaces/npc.interface";
import { NpcConnection } from "@/interfaces/connection.interface";

describe("Serialization Utils", () => {
    describe("normalizeConnections", () => {
        it("converts valid string IDs to ObjectId and adds missing role", () => {
            const input = [{ id: new ObjectId().toString(), type: "settlement" }];
            const result = normalizeConnections(input);
            expect(result[0].id).toBeInstanceOf(ObjectId);
            expect(result[0].role).toBe("");
        });

        it("keeps invalid IDs as-is and fills missing role", () => {
            const input = [{ id: "invalid-id", type: "settlement" }];
            const result = normalizeConnections(input);
            expect(result[0].id).toBe("invalid-id");
            expect(result[0].role).toBe("");
        });

        it("handles empty input", () => {
            expect(normalizeConnections()).toEqual([]);
        });
    });

    describe("serializeConnections", () => {
        it("converts ObjectId IDs to strings", () => {
            const id = new ObjectId();
            const input: NpcConnection[] = [{ id: id.toString(), type: "settlement", role: "ally" }];
            const result = serializeConnections(input);
            expect(result[0].id).toBe(id.toString());
            expect(result[0].role).toBe("ally");
        });

        it("handles string IDs", () => {
            const input: NpcConnection[] = [{ id: "123", type: "settlement", role: "leader"}];
            const result = serializeConnections(input);
            expect(result[0].id).toBe("123");
        });
    });

    describe("serializeConnectionsForClient", () => {
        it("fills missing role", () => {
            const input: NpcConnection[] = [{ id: "1", type: "settlement", role: "" }];
            const result = serializeConnectionsForClient(input);
            expect(result[0].role).toBe("");
            expect(result[0].type).toBe("settlement");
        });

        it("preserves existing role", () => {
            const input: NpcConnection[] = [{ id: "1", type: "npc", role: "rival" }];
            const result = serializeConnectionsForClient(input);
            expect(result[0].role).toBe("rival");
        });
    });

    describe("serializeNpcForClient", () => {
        const now = new Date();

        it("serializes all fields and converts IDs/dates", () => {
        const npc: Npc = {
            _id: "123",
            userId: "123",
            name: "Test NPC",
            traits: ["brave"],
            description: "desc",
            gmNotes: "gm",
            publicNotes: "pub",
            connections: [{ id: "123", type: "settlement", role: "" }],
            isPublic: true,
            editors: ["user1"],
            createdAt: now.toISOString(),
            updatedAt: now.toISOString()
        };
        const result = serializeNpcForClient(npc);
        expect(result._id).toBe(npc._id.toString());
        expect(result.userId).toBe(npc.userId.toString());
        expect(result.name).toBe("Test NPC");
        expect(result.traits).toEqual(["brave"]);
        expect(result.connections[0].id).toBeDefined();
        expect(result.connections[0].role).toBe("");
        expect(result.createdAt).toBe(now.toISOString());
        expect(result.updatedAt).toBe(now.toISOString());
        });

        it("handles missing optional fields", () => {
            const npc: Npc = { _id: "1", userId: "2", name: "Test Name", isPublic: false, connections: [], editors: [], createdAt: now.toISOString(), updatedAt: now.toISOString() };
            const result = serializeNpcForClient(npc);
            expect(result.name).toBe("Test Name");
            expect(result.traits).toEqual([]);
            expect(result.connections).toEqual([]);
        });
    });

    describe("serializeSettlementForClient", () => {
        it("serializes Mongoose-like object", () => {
            const obj: any = {
                _id: new ObjectId(),
                userId: new ObjectId(),
                connections: [{ id: new ObjectId(), type: "settlement" }],
                toObject: function () { return this; },
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = serializeSettlementForClient(obj);
            expect(result._id).toBe(obj._id.toString());
            expect(result.userId).toBe(obj.userId.toString());
            expect(result.connections[0].id).toBeDefined();
            expect(result.connections[0].role).toBe("");
            expect(result.createdAt).toBeDefined();
            expect(result.updatedAt).toBeDefined();
        });

        it("throws error if _id missing", () => {
            const obj: any = { toObject: () => ({}) };
            expect(() => serializeSettlementForClient(obj)).toThrow("Settlement object missing _id");
        });
    });

    describe("toStringId and toISOStringSafe edge cases", () => {
        it("toStringId handles undefined and null", () => {
            expect(toStringId(undefined)).toBe("");
            expect(toStringId(null)).toBe("");
            expect(toStringId("abc")).toBe("abc");
            const id = new ObjectId();
            expect(toStringId(id)).toBe(id.toString());
        });

        it("toISOStringSafe handles undefined, null, string, Date", () => {
            const now = new Date();
            expect(toISOStringSafe(undefined)).toBeNull();
            expect(toISOStringSafe(null)).toBeNull();
            expect(toISOStringSafe(now)).toBe(now.toISOString());
            expect(toISOStringSafe("2025-01-01")).toBe("2025-01-01");
        });
    });

    describe("normalizeConnections edge cases", () => {
        it("preserves role if already set", () => {
            const input: any = [{ id: new ObjectId().toString(), type: "settlement", role: "leader" }];
            const result = normalizeConnections(input);
            expect(result[0].role).toBe("leader");
        });

        it("preserves non-valid id types like null/undefined", () => {
            const input: any = [{ id: null, type: "settlement" }];
            const result = normalizeConnections(input);
            expect(result[0].id).toBeNull();
            expect(result[0].role).toBe("");
        });
    });

    describe("serializeConnectionsForClient - missing name", () => {
        it("fills missing name with empty string", () => {
            const input: NpcConnection[] = [{ id: "1", type: "npc", role: "friend" }];
            const result = serializeConnectionsForClient(input);
            expect(result[0].name).toBe("");
        });
    });

    describe("serializeNpcForClient - missing optional fields", () => {
        it("fills description, gmNotes, publicNotes with empty strings if missing", () => {
            const npc: Npc = {
                _id: "1",
                userId: "2",
                name: "NPC",
                isPublic: true,
                connections: [],
                editors: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const result = serializeNpcForClient(npc);
            expect(result.description).toBe("");
            expect(result.gmNotes).toBe("");
            expect(result.publicNotes).toBe("");
            expect(result.traits).toEqual([]);
        });

        it("fills connections array if missing", () => {
            const npc: Npc = {
                _id: "1",
                userId: "2",
                name: "NPC",
                isPublic: true,
                connections: undefined as any,
                editors: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const result = serializeNpcForClient(npc);
            expect(result.connections).toEqual([]);
        });

        it("fills editors array if missing", () => {
            const npc: Npc = {
                _id: "1",
                userId: "2",
                name: "NPC",
                isPublic: true,
                connections: [],
                editors: undefined as any,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const result = serializeNpcForClient(npc);
            expect(result.editors).toEqual([]);
        });
    });

    describe("serializeSettlementForClient - userId as object with _id", () => {
        it("serializes userId._id to string", () => {
            const obj: any = {
                _id: new ObjectId(),
                userId: { _id: new ObjectId() },
                connections: [],
                toObject: function () { return this; },
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = serializeSettlementForClient(obj);
            expect(result.userId).toBe(obj.userId._id.toString());
        });

        it("serializes userId object with toString", () => {
            const fakeUserId = { toString: () => "fake-user" };
            const obj: any = {
                _id: new ObjectId(),
                userId: fakeUserId,
                connections: [],
                toObject: function () { return this; },
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = serializeSettlementForClient(obj);
            expect(result.userId).toBe("fake-user");
        });
    });

    describe("toISOStringSafe - non-Date, non-string input", () => {
        it("stringifies numbers", () => {
            expect(toISOStringSafe(123 as any)).toBe("123");
        });

        it("stringifies objects", () => {
            expect(toISOStringSafe({ a: 1 } as any)).toBe("[object Object]");
        });
    });

});
