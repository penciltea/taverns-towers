/**
 * @jest-environment node
 */

import { getDomainsByEnvironment } from "./getDomainsByEnvironment.rules";
import {
  DomainsByClimateMapping,
  DomainsByTerrainMapping,
  DomainsByTagMapping,
} from "./domains.mappings";

jest.mock("./domains.mappings", () => ({
  DomainsByTagMapping: {
    "tag1": ["domainA", "domainB"],
    "tag2": ["domainC"],
  },
  DomainsByTerrainMapping: {
    "mountain": ["domainX"],
    "forest": ["domainY", "domainZ"],
  },
  DomainsByClimateMapping: {
    "tropical": ["domainHot"],
    "arctic": ["domainCold"],
  },
}));

describe("getDomainsByEnvironment", () => {
  it("returns domains from tags", () => {
    const result = getDomainsByEnvironment({ tags: ["tag1"] });
    expect(result).toEqual(["domainA", "domainB"]);
  });

  it("returns domains from terrain", () => {
    const result = getDomainsByEnvironment({ terrain: ["forest"] });
    expect(result).toEqual(["domainY", "domainZ"]);
  });

  it("returns domains from climate", () => {
    const result = getDomainsByEnvironment({ climate: "tropical" });
    expect(result).toEqual(["domainHot"]);
  });

  it("merges and deduplicates domains from multiple sources", () => {
    const result = getDomainsByEnvironment({
      tags: ["tag1"],
      terrain: ["mountain"],
      climate: "arctic",
    });
    expect(result).toEqual(["domainA", "domainB", "domainX", "domainCold"]);
  });

  it("handles unknown tags/terrain/climate gracefully", () => {
    const result = getDomainsByEnvironment({
      tags: ["unknownTag"],
      terrain: ["unknownTerrain"],
      climate: "unknownClimate",
    });
    expect(result).toEqual([]);
  });

  it("removes duplicate domains across sources", () => {
    // mock overlap: tag1 shares "domainX" with mountain
    (DomainsByTagMapping as any)["tagWithOverlap"] = ["domainX", "domainExtra"];
    const result = getDomainsByEnvironment({
      tags: ["tagWithOverlap"],
      terrain: ["mountain"],
    });
    expect(result).toEqual(["domainX", "domainExtra"]);
  });
});
