import { getDomainsByEnvironment } from "@/lib/modules/common/domains/getDomainsByEnvironment.rules";
import { DomainsByTag } from "@/lib/models/generator/common/domainByTags.model";
import { DomainsByTerrain } from "@/lib/models/generator/common/domainByTerrain.model";
import { DomainsByClimate } from "@/lib/models/generator/common/domainByClimate.model";

// Use real mappings for fallback tests
import * as realMappings from "./domains.mappings";

// Mock DB models globally
jest.mock("@/lib/models/generator/common/domainByTags.model");
jest.mock("@/lib/models/generator/common/domainByTerrain.model");
jest.mock("@/lib/models/generator/common/domainByClimate.model");

// Helper to mock `.lean()` calls
function createLeanMock<T>(data: T | T[] | null) {
  return { lean: jest.fn().mockResolvedValue(data) };
}

describe("getDomainsByEnvironment", () => {
  const mockTagData = [{ tag: "Port", domains: ["Travel", "Water", "Storms", "Luck", "Trade"] }];
  const mockTerrainData = [{ terrain: "Forest", domains: ["Nature", "Dreams", "Moon", "Life", "Twilight"] }];
  const mockClimateData = { climate: "Temperate", domains: ["Life", "Harvest", "Nature", "Glory"] };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("normal DB responses", () => {
    it("returns domains based on tags only", async () => {
      (DomainsByTag.find as jest.Mock).mockReturnValue(createLeanMock(mockTagData));
      (DomainsByTerrain.find as jest.Mock).mockReturnValue(createLeanMock([]));
      (DomainsByClimate.findOne as jest.Mock).mockReturnValue(createLeanMock(null));

      const result = await getDomainsByEnvironment({ tags: ["Port"] });

      const expectedDomains = Array.from(new Set([
        ...mockTagData[0].domains,
        ...(realMappings.DomainsByTagMapping["Port"] ?? []),
      ]));

      expect(result).toEqual(expect.arrayContaining(expectedDomains));
    });

    it("returns domains based on terrain only", async () => {
      (DomainsByTag.find as jest.Mock).mockReturnValue(createLeanMock([]));
      (DomainsByTerrain.find as jest.Mock).mockReturnValue(createLeanMock(mockTerrainData));
      (DomainsByClimate.findOne as jest.Mock).mockReturnValue(createLeanMock(null));

      const result = await getDomainsByEnvironment({ terrain: ["Forest"] });

      const expectedDomains = Array.from(new Set([
        ...mockTerrainData[0].domains,
        ...(realMappings.DomainsByTerrainMapping["Forest"] ?? []),
      ]));

      expect(result).toEqual(expect.arrayContaining(expectedDomains));
    });

    it("returns domains based on climate only", async () => {
      (DomainsByTag.find as jest.Mock).mockReturnValue(createLeanMock([]));
      (DomainsByTerrain.find as jest.Mock).mockReturnValue(createLeanMock([]));
      (DomainsByClimate.findOne as jest.Mock).mockReturnValue(createLeanMock(mockClimateData));

      const result = await getDomainsByEnvironment({ climate: "Temperate" });

      const expectedDomains = Array.from(new Set([
        ...mockClimateData.domains,
        ...(realMappings.DomainsByClimateMapping["Temperate"] ?? []),
      ]));

      expect(result).toEqual(expect.arrayContaining(expectedDomains));
    });

    it("combines tags, terrain, and climate domains", async () => {
      (DomainsByTag.find as jest.Mock).mockReturnValue(createLeanMock(mockTagData));
      (DomainsByTerrain.find as jest.Mock).mockReturnValue(createLeanMock(mockTerrainData));
      (DomainsByClimate.findOne as jest.Mock).mockReturnValue(createLeanMock(mockClimateData));

      const result = await getDomainsByEnvironment({
        tags: ["Port"],
        terrain: ["Forest"],
        climate: "Temperate",
      });

      const expectedDomains = Array.from(new Set([
        ...mockTagData[0].domains,
        ...(realMappings.DomainsByTagMapping["Port"] ?? []),
        ...mockTerrainData[0].domains,
        ...(realMappings.DomainsByTerrainMapping["Forest"] ?? []),
        ...mockClimateData.domains,
        ...(realMappings.DomainsByClimateMapping["Temperate"] ?? []),
      ]));

      expect(result).toEqual(expect.arrayContaining(expectedDomains));
    });
  });

  /** ----------------------------
   * Fallback logic coverage
   * ---------------------------- */
  describe("fallback logic coverage", () => {
    const fallbackTagMapping = { Port: ["FallbackTagDomain"] };
    const fallbackTerrainMapping = { Forest: ["FallbackTerrainDomain"] };
    const fallbackClimateMapping = { Temperate: ["FallbackClimateDomain"] };

    beforeAll(() => {
      Object.assign(realMappings.DomainsByTagMapping, fallbackTagMapping);
      Object.assign(realMappings.DomainsByTerrainMapping, fallbackTerrainMapping);
      Object.assign(realMappings.DomainsByClimateMapping, fallbackClimateMapping);
    });

    afterAll(() => {
      Object.keys(fallbackTagMapping).forEach(k => delete realMappings.DomainsByTagMapping[k]);
      Object.keys(fallbackTerrainMapping).forEach(k => delete realMappings.DomainsByTerrainMapping[k]);
      Object.keys(fallbackClimateMapping).forEach(k => delete realMappings.DomainsByClimateMapping[k]);
    });

    it("uses fallback when tag DB call fails", async () => {
      (DomainsByTag.find as jest.Mock).mockReturnValue({ lean: () => Promise.reject(new Error("fail")) });
      (DomainsByTerrain.find as jest.Mock).mockReturnValue({ lean: () => Promise.resolve([]) });
      (DomainsByClimate.findOne as jest.Mock).mockReturnValue({ lean: () => Promise.resolve(null) });

      const result = await getDomainsByEnvironment({ tags: ["Port"] });
      expect(result).toEqual(expect.arrayContaining(["FallbackTagDomain"]));
    });

    it("uses fallback when terrain DB call fails", async () => {
      (DomainsByTag.find as jest.Mock).mockReturnValue({ lean: () => Promise.resolve([]) });
      (DomainsByTerrain.find as jest.Mock).mockReturnValue({ lean: () => Promise.reject(new Error("fail")) });
      (DomainsByClimate.findOne as jest.Mock).mockReturnValue({ lean: () => Promise.resolve(null) });

      const result = await getDomainsByEnvironment({ terrain: ["Forest"] });
      expect(result).toEqual(expect.arrayContaining(["FallbackTerrainDomain"]));
    });

    it("uses fallback when climate DB call fails", async () => {
      (DomainsByTag.find as jest.Mock).mockReturnValue({ lean: () => Promise.resolve([]) });
      (DomainsByTerrain.find as jest.Mock).mockReturnValue({ lean: () => Promise.resolve([]) });
      (DomainsByClimate.findOne as jest.Mock).mockReturnValue({ lean: () => Promise.reject(new Error("fail")) });

      const result = await getDomainsByEnvironment({ climate: "Temperate" });
      expect(result).toEqual(expect.arrayContaining(["FallbackClimateDomain"]));
    });
  });

  /** ----------------------------
   * Misc coverage
   * ---------------------------- */
  it("removes duplicates across sources", async () => {
    (DomainsByTag.find as jest.Mock).mockReturnValue(createLeanMock([{ tag: "Port", domains: ["Magic"] }]));
    (DomainsByTerrain.find as jest.Mock).mockReturnValue(createLeanMock([{ terrain: "Forest", domains: ["Magic"] }]));
    (DomainsByClimate.findOne as jest.Mock).mockReturnValue(createLeanMock({ climate: "Temperate", domains: ["Magic"] }));

    const result = await getDomainsByEnvironment({ tags: ["Port"], terrain: ["Forest"], climate: "Temperate" });
    expect(result).toEqual(Array.from(new Set(result)));
  });

  it("returns empty array if no input provided", async () => {
    (DomainsByTag.find as jest.Mock).mockReturnValue(createLeanMock([]));
    (DomainsByTerrain.find as jest.Mock).mockReturnValue(createLeanMock([]));
    (DomainsByClimate.findOne as jest.Mock).mockReturnValue(createLeanMock(null));

    const result = await getDomainsByEnvironment({});
    expect(result).toEqual([]);
  });
});