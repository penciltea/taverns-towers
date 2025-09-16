import { ObjectId } from "bson";
import {
  normalizeConnections,
  serializeConnections,
  serializeConnectionsForClient,
  serializeNpcForClient,
  serializeSettlementForClient,
  toISOStringSafe,
  toStringId,
} from "@/lib/util/connectionHelpers";
import { Npc } from "@/interfaces/npc.interface";
import { NpcConnection } from "@/interfaces/connection.interface";
import { ISettlement } from "@/lib/models/settlement.model";

// A light Mongoose-like settlement shape for tests
interface MockSettlement {
  _id?: ObjectId | string;
  userId?: ObjectId | { _id: ObjectId } | { toString: () => string };
  connections?: Array<{ id: ObjectId | string | null; type: string; role?: string }>;
  toObject: () => unknown;
  createdAt?: Date;
  updatedAt?: Date;
}

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

        it("preserves role if already set", () => {
            const input = [{ id: new ObjectId().toString(), type: "settlement", role: "leader" }];
            const result = normalizeConnections(input);
            expect(result[0].role).toBe("leader");
        });

        it("preserves non-valid id types like null/undefined", () => {
            const input = [{ id: null, type: "settlement" }];
            const result = normalizeConnections(input as unknown as NpcConnection[]);
            expect(result[0].id).toBeNull();
            expect(result[0].role).toBe("");
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
            const input: NpcConnection[] = [{ id: "123", type: "settlement", role: "leader" }];
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

        it("fills missing name with empty string", () => {
            const input: NpcConnection[] = [{ id: "1", type: "npc", role: "friend" }];
            const result = serializeConnectionsForClient(input);
            expect(result[0].name).toBe("");
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
                updatedAt: now.toISOString(),
            };
            const result = serializeNpcForClient(npc);

            expect(result._id).toBe("123");
            expect(result.userId).toBe("123");
            expect(result.name).toBe("Test NPC");
            expect(result.traits).toEqual(["brave"]);
            expect(result.connections[0].id).toBeDefined();
            expect(result.connections[0].role).toBe("");
            expect(result.createdAt).toBe(now.toISOString());
            expect(result.updatedAt).toBe(now.toISOString());
        });

        it("fills missing optional fields", () => {
            const npc: Npc = {
                _id: "1",
                userId: "2",
                name: "Test Name",
                isPublic: false,
                connections: [],
                editors: [],
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
            };
            const result = serializeNpcForClient(npc);
            
            expect(result.description).toBe("");
            expect(result.gmNotes).toBe("");
            expect(result.publicNotes).toBe("");
            expect(result.traits).toEqual([]);
            expect(result.connections).toEqual([]);
        });

        it("fills connections & editors arrays if missing", () => {
            const npc: Npc = {
                _id: "1",
                userId: "2",
                name: "NPC",
                isPublic: true,
                connections: undefined as unknown as NpcConnection[],
                editors: undefined as unknown as string[],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const result = serializeNpcForClient(npc);

            expect(result.connections).toEqual([]);
            expect(result.editors).toEqual([]);
        });
    });

    describe("serializeSettlementForClient", () => {
        it("serializes Mongoose-like object", () => {
            const obj: MockSettlement = {
                _id: new ObjectId(),
                userId: new ObjectId(),
                connections: [{ id: new ObjectId(), type: "settlement" }],
                toObject: function () {
                return this;
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = serializeSettlementForClient(obj as unknown as ISettlement);

            expect(result._id).toBe(obj._id!.toString());
            expect(result.userId).toBe((obj.userId as ObjectId).toString());
            expect(result.connections[0].id).toBeDefined();
            expect(result.connections[0].role).toBe("");
            expect(result.createdAt).toBeDefined();
            expect(result.updatedAt).toBeDefined();
        });

        it("throws error if _id missing", () => {
            const obj: MockSettlement = { toObject: () => ({}) };
            expect(() => serializeSettlementForClient(obj as unknown as ISettlement)).toThrow(
                "Settlement object missing _id"
            );
        });

        it("serializes userId._id to string", () => {
            const obj: MockSettlement = {
                _id: new ObjectId(),
                userId: { _id: new ObjectId() },
                connections: [],
                toObject: function () {
                return this;
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = serializeSettlementForClient(obj as unknown as ISettlement);

            expect(result.userId).toBe((obj.userId as { _id: ObjectId })._id.toString());
        });

        it("serializes userId object with toString", () => {
            const fakeUserId = { toString: () => "fake-user" };
            const obj: MockSettlement = {
                _id: new ObjectId(),
                userId: fakeUserId,
                connections: [],
                toObject: function () {
                return this;
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = serializeSettlementForClient(obj as unknown as ISettlement);

            expect(result.userId).toBe("fake-user");
        });
    });

    describe("toStringId and toISOStringSafe", () => {
        it("toStringId handles undefined and null", () => {
            expect(toStringId(undefined)).toBe("");
            expect(toStringId(null)).toBe("");
            expect(toStringId("abc")).toBe("abc");
            const id = new ObjectId();
            expect(toStringId(id)).toBe(id.toString());
        });

        it("toISOStringSafe handles undefined, null, string, Date and others", () => {
            const now = new Date();
            expect(toISOStringSafe(undefined)).toBeNull();
            expect(toISOStringSafe(null)).toBeNull();
            expect(toISOStringSafe(now)).toBe(now.toISOString());
            expect(toISOStringSafe("2025-01-01")).toBe("2025-01-01");

            expect(toISOStringSafe(123 as unknown as Date)).toBe("123");
            expect(toISOStringSafe({ a: 1 } as unknown as Date)).toBe("[object Object]");
        });
    });
});
