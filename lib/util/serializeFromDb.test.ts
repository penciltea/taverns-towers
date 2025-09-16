import { ObjectId } from "mongodb";
import { serializeFromDb } from "@/lib/util/serializeFromDb";

interface NestedDoc {
    _id: ObjectId;
    value: number;
}

interface TestDoc {
    _id: ObjectId;
    name: string;
    otherId?: ObjectId;
    dateField?: Date;
    nested?: NestedDoc;
    arrayField?: (ObjectId | string)[];
    editors?: (ObjectId | string)[];
    [key: string]: unknown;
}

describe("serializeFromDb", () => {
    const objectId = new ObjectId();
    const nestedId = new ObjectId();
    const editorId = new ObjectId();
    const date = new Date("2025-09-15T00:00:00Z");

    it("serializes basic ObjectId fields to string", () => {
        const input: TestDoc = { _id: objectId, name: "Test Name" };
        const result = serializeFromDb(input) as Record<string, unknown>;

        expect(result._id).toBe(objectId.toString());
        expect(result.name).toBe("Test Name");
    });

    it("serializes optional ObjectId fields", () => {
        const input: TestDoc = { _id: objectId, name: "Test", otherId: nestedId };
        const result = serializeFromDb(input) as Record<string, unknown>;

        expect(result.otherId).toBe(nestedId.toString());
    });

    it("serializes Date fields to ISO string", () => {
        const input: TestDoc = { _id: objectId, name: "Test", dateField: date };
        const result = serializeFromDb(input) as Record<string, unknown>;

        expect(result.dateField).toBe(date.toISOString());
    });

    it("serializes nested objects recursively", () => {
        const input: TestDoc = {
            _id: objectId,
            name: "Test",
            nested: { _id: nestedId, value: 42 },
        };
        const result = serializeFromDb(input) as Record<string, unknown>;

        const nestedResult = result.nested as Record<string, unknown>;
        expect(nestedResult._id).toBe(nestedId.toString());
        expect(nestedResult.value).toBe(42);
    });

    it("serializes arrays of ObjectIds and strings", () => {
        const input: TestDoc = {
            _id: objectId,
            name: "Test",
            arrayField: [nestedId, "stringId"],
        };
        const result = serializeFromDb(input) as Record<string, unknown>;

        const arrayResult = result.arrayField as string[];
        expect(arrayResult).toContain(nestedId.toString());
        expect(arrayResult).toContain("stringId");
    });

    it("serializes editors array with mixed ObjectId and strings", () => {
        const input: TestDoc = {
            _id: objectId,
            name: "Test",
            editors: [editorId, "user123"],
        };
        const result = serializeFromDb(input) as Record<string, unknown>;

        const editorsResult = result.editors as string[];
        expect(editorsResult).toContain(editorId.toString());
        expect(editorsResult).toContain("user123");
    });

    it("handles Mongoose-style documents with toObject()", () => {
        const input: TestDoc & { toObject: () => TestDoc } = {
            _id: objectId,
            name: "Test",
            toObject: function () { return { _id: this._id, name: this.name }; },
        };

        const result = serializeFromDb(input) as Record<string, unknown>;
        expect(result._id).toBe(objectId.toString());
        expect(result.name).toBe("Test");
    });

    it("handles missing optional fields gracefully", () => {
        const input: TestDoc = { _id: objectId, name: "Test" };
        const result = serializeFromDb(input) as Record<string, unknown>;

        expect(result.otherId).toBeUndefined();
        expect(result.nested).toBeUndefined();
        expect(result.arrayField).toBeUndefined();
        expect(result.editors).toBeUndefined();
    });

    it("always ensures _id exists as string", () => {
        const input: TestDoc = { _id: objectId, name: "Test" };
        const result = serializeFromDb(input) as Record<string, unknown>;

        expect(result._id).toBe(objectId.toString());
    });
});
