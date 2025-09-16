import { Types } from "mongoose";
import { toObjectIdArray,  transformSettlementFormData,  transformSiteFormData,  transformNpcFormData  } from "@/lib/util/transformFormDataForDB";
import { SettlementFormData } from "@/schemas/settlement.schema";
import { SiteFormData } from "@/schemas/site.schema";
import { NpcFormData } from "@/schemas/npc.schema";

describe("transformHelpers", () => {
    describe("toObjectIdArray", () => {
        it("converts string IDs to ObjectId instances", () => {
            const ids = ["650f5c4e1a2b3c4d5e6f7a8b", "650f5c4e1a2b3c4d5e6f7a8c"];
            const result = toObjectIdArray(ids);
            expect(result).toHaveLength(ids.length);
            result?.forEach((id, index) => {
                expect(id).toBeInstanceOf(Types.ObjectId);
                expect(id.toString()).toBe(ids[index]);
            });
        });

        it("returns undefined if input is undefined", () => {
            expect(toObjectIdArray(undefined)).toBeUndefined();
        });

        it("returns empty array if input is empty", () => {
            expect(toObjectIdArray([])).toEqual([]);
        });
    });

    describe("transformSettlementFormData", () => {
        const baseData: Partial<SettlementFormData> = {
            name: "Test Settlement",
        };

        it("preserves all fields and fills undefined arrays with empty arrays", () => {
            const data: SettlementFormData = {
                ...baseData,
                tags: undefined,
                terrain: undefined,
                crime: undefined,
                map: undefined,
            } as SettlementFormData;

            const result = transformSettlementFormData(data);
            expect(result.tags).toEqual([]);
            expect(result.terrain).toEqual([]);
            expect(result.crime).toEqual([]);
            expect(result.map).toBeUndefined();
            expect(result.name).toBe("Test Settlement");
        });

        it("keeps arrays if provided", () => {
            const data: SettlementFormData = {
                ...baseData,
                tags: ["tag1"],
                terrain: ["forest"],
                crime: ["theft"],
                map: "http://example.com/map.png",
            } as SettlementFormData;

            const result = transformSettlementFormData(data);
            expect(result.tags).toEqual(["tag1"]);
            expect(result.terrain).toEqual(["forest"]);
            expect(result.crime).toEqual(["theft"]);
            expect(result.map).toBe("http://example.com/map.png");
        });

        it("sets map to undefined if not a valid URL", () => {
            const data: SettlementFormData = {
                ...baseData,
                map: "not-a-url",
            } as SettlementFormData;

            const result = transformSettlementFormData(data);
            expect(result.map).toBeUndefined();
        });
    });

    describe("transformSiteFormData", () => {
        it("keeps valid image URLs", () => {
            const data: SiteFormData = { type: "shop", name: "Shop1", image: "http://example.com/image.png" } as SiteFormData;
            const result = transformSiteFormData(data);
            expect(result.image).toBe("http://example.com/image.png");
        });

        it("sets invalid or missing images to undefined", () => {
            const data1: SiteFormData = { type: "shop", name: "Shop1", image: "invalid-url" } as SiteFormData;
            const data2: SiteFormData = { type: "shop", name: "Shop1" } as SiteFormData;

            expect(transformSiteFormData(data1).image).toBeUndefined();
            expect(transformSiteFormData(data2).image).toBeUndefined();
        });
    });

    describe("transformNpcFormData", () => {
        it("keeps valid image URLs", () => {
            const data: NpcFormData = { name: "NPC1", image: "http://example.com/npc.png" } as NpcFormData;
            const result = transformNpcFormData(data);
            expect(result.image).toBe("http://example.com/npc.png");
        });

        it("sets invalid or missing images to undefined", () => {
            const data1: NpcFormData = { name: "NPC1", image: "ftp://example.com/npc.png" } as NpcFormData;
            const data2: NpcFormData = { name: "NPC1" } as NpcFormData;

            expect(transformNpcFormData(data1).image).toBeUndefined();
            expect(transformNpcFormData(data2).image).toBeUndefined();
        });
    });

});
