import { applyDomainsByConditions } from "./domain.rules";
import { getDomainsByEnvironment } from "@/lib/modules/common/domains/getDomainsByEnvironment.rules";
import { getRandomSubset } from "@/lib/util/randomValues";
import { domainCountBySize } from "../mappings/domain.mappings";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";

jest.mock("@/lib/modules/common/domains/getDomainsByEnvironment.rules");
jest.mock("@/lib/util/randomValues");

describe("applyDomainsByConditions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns original data if domains do not include 'random'", async () => {
    const input = makeSettlementInput({ domains: ["arcana"] });
    const result = await applyDomainsByConditions(input);
    expect(result).toEqual(input);
    expect(getDomainsByEnvironment).not.toHaveBeenCalled();
    expect(getRandomSubset).not.toHaveBeenCalled();
  });

  it("generates domains using getDomainsByEnvironment and getRandomSubset", async () => {
    const input = makeSettlementInput({ domains: ["random"] });
    const mockDomainPool = ["arcana", "ritual", "nature"];

    (getDomainsByEnvironment as jest.Mock).mockResolvedValue(mockDomainPool);
    (getRandomSubset as jest.Mock).mockImplementation((arr, { min, max }) => arr.slice(min, max));

    const result = await applyDomainsByConditions(input);

    // Should call getDomainsByEnvironment with the correct input
    expect(getDomainsByEnvironment).toHaveBeenCalledWith({
      tags: input.tags,
      terrain: input.terrain,
      climate: input.climate,
    });

    // Should call getRandomSubset with the domain pool and the correct min/max
    const [expectedMin, expectedMax] = domainCountBySize[input.size ?? "Town"] ?? [3, 4];
    expect(getRandomSubset).toHaveBeenCalledWith(mockDomainPool, { min: expectedMin, max: expectedMax });

    // The result domains should be what getRandomSubset returns
    expect(result.domains).toEqual(mockDomainPool.slice(expectedMin, expectedMax));
  });

  it("handles empty domain pool gracefully", async () => {
    const input = makeSettlementInput({ domains: ["random"] });

    (getDomainsByEnvironment as jest.Mock).mockResolvedValue([]);
    (getRandomSubset as jest.Mock).mockImplementation((arr) => arr);

    const result = await applyDomainsByConditions(input);

    expect(result.domains).toEqual([]);
    expect(getRandomSubset).toHaveBeenCalledWith([], expect.any(Object));
  });
});
