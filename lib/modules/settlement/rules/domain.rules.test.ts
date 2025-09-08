import { applyDomainsByConditions } from "./domain.rules";
import { getDomainsByEnvironment } from "../../common/domains/getDomainsByEnvironment.rules";
import { getRandomSubset } from "@/lib/util/randomValues";
import { NormalizedSettlementInput } from "./normalize";
import { domainCountBySize } from "../mappings/domain.mappings";

jest.mock("../../common/domains/getDomainsByEnvironment.rules");
jest.mock("@/lib/util/randomValues");

describe("applyDomainsByConditions", () => {
  const baseInput: NormalizedSettlementInput = {
    name: "Test Settlement",
    size: "Town",
    tags: ["magic"],
    terrain: ["forest"],
    climate: "temperate",
    domains: ["random"], // triggers generation
    magic: "low",
    rulingStyle: "monarchy",
    wealth: "average",
    crime: ["pickpocketing"],
    connections: [],
    userId: "user1",
    editors: [],
    isPublic: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns original data if domains do not include 'random'", async () => {
    const input = { ...baseInput, domains: ["arcana"] };
    const result = await applyDomainsByConditions(input);
    expect(result).toEqual(input);
    expect(getDomainsByEnvironment).not.toHaveBeenCalled();
    expect(getRandomSubset).not.toHaveBeenCalled();
  });

  it("generates domains using getDomainsByEnvironment and getRandomSubset", async () => {
    const mockDomainPool = ["arcana", "ritual", "nature"];
    (getDomainsByEnvironment as jest.Mock).mockResolvedValue(mockDomainPool);
    (getRandomSubset as jest.Mock).mockImplementation((arr, { min, max }) => arr.slice(0, max));

    const result = await applyDomainsByConditions({ ...baseInput });

    // Should call getDomainsByEnvironment with the correct input
    expect(getDomainsByEnvironment).toHaveBeenCalledWith({
      tags: baseInput.tags,
      terrain: baseInput.terrain,
      climate: baseInput.climate,
    });

    // Should call getRandomSubset with the domain pool and the correct min/max
    const [expectedMin, expectedMax] = domainCountBySize[baseInput.size ?? "Town"] ?? [3, 4];
    expect(getRandomSubset).toHaveBeenCalledWith(mockDomainPool, { min: expectedMin, max: expectedMax });

    // The result domains should be what getRandomSubset returns
    expect(result.domains).toEqual(mockDomainPool.slice(0, expectedMax));
  });

  it("handles empty domain pool gracefully", async () => {
    (getDomainsByEnvironment as jest.Mock).mockResolvedValue([]);
    (getRandomSubset as jest.Mock).mockImplementation((arr) => arr);

    const result = await applyDomainsByConditions({ ...baseInput });

    expect(result.domains).toEqual([]);
    expect(getRandomSubset).toHaveBeenCalledWith([], expect.any(Object));
  });
});
