import { getDomainsByEnvironment } from "@/lib/modules/common/domains/getDomainsByEnvironment.rules";
import { DomainsByTag } from "@/lib/models/generator/common/domainByTags.model";
import { DomainsByTerrain } from "@/lib/models/generator/common/domainByTerrain.model";
import { DomainsByClimate } from "@/lib/models/generator/common/domainByClimate.model";
import * as extractUtils from "@/lib/util/extractArrayFromResult";
import { DomainsByTagMapping, DomainsByTerrainMapping, DomainsByClimateMapping } from "./domains.mappings";

jest.mock("@/lib/models/generator/common/domainByTags.model");
jest.mock("@/lib/models/generator/common/domainByTerrain.model");
jest.mock("@/lib/models/generator/common/domainByClimate.model");

describe("getDomainsByEnvironment", () => {
  const mockTagData = [{ tag: "magic", domains: ["arcana", "ritual"] }];
  const mockTerrainData = [{ terrain: "forest", domains: ["nature", "survival"] }];
  const mockClimateData = { climate: "temperate", domains: ["weather", "seasonal"] };

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(extractUtils, "extractArrayFromResult").mockImplementation(
      (result: PromiseSettledResult<unknown>, extractor: (value: unknown) => string[] | undefined, fallback: string[]): string[] => {
        if (result.status === "fulfilled" && result.value != null) {
          return extractor(result.value) ?? [];
        }
        return fallback;
      }
    );
  });

  it("returns domains based on tags only", async () => {
    (DomainsByTag.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(mockTagData) });
    (DomainsByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    (DomainsByClimate.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

    const result = await getDomainsByEnvironment({ tags: ["magic"] });
    expect(result).toEqual(expect.arrayContaining(["arcana", "ritual", ...(DomainsByTagMapping["magic"] ?? [])]));
  });

  it("returns domains based on terrain only", async () => {
    (DomainsByTag.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    (DomainsByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(mockTerrainData) });
    (DomainsByClimate.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

    const result = await getDomainsByEnvironment({ terrain: ["forest"] });
    expect(result).toEqual(expect.arrayContaining(["nature", "survival", ...(DomainsByTerrainMapping["forest"] ?? [])]));
  });

  it("returns domains based on climate only", async () => {
    (DomainsByTag.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    (DomainsByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    (DomainsByClimate.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(mockClimateData) });

    const result = await getDomainsByEnvironment({ climate: "temperate" });
    expect(result).toEqual(expect.arrayContaining(["weather", "seasonal", ...(DomainsByClimateMapping["temperate"] ?? [])]));
  });

  it("removes duplicate domains", async () => {
    (DomainsByTag.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([{ tag: "magic", domains: ["arcana"] }]) });
    (DomainsByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([{ terrain: "forest", domains: ["arcana"] }]) });
    (DomainsByClimate.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue({ climate: "temperate", domains: ["arcana"] }) });

    const result = await getDomainsByEnvironment({ tags: ["magic"], terrain: ["forest"], climate: "temperate" });
    expect(result).toEqual(Array.from(new Set(result)));
  });

  it("returns empty array if no input provided", async () => {
    (DomainsByTag.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    (DomainsByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    (DomainsByClimate.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

    const result = await getDomainsByEnvironment({});
    expect(result).toEqual([]);
  });
});
