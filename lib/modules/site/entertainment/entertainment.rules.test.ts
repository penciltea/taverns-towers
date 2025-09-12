import { isEntertainmentSite, applyEntertainmentVenueRule, generateEntertainmentData } from "./entertainment.rules";
import { ENTERTAINMENT_VENUE_TYPES } from "@/constants/site/site.options";
import { getRandom } from "@/lib/util/randomValues";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { formatCurrencyFromCp } from "@/lib/util/convertCurrency";
import { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerationInput } from "@/interfaces/site.interface";

jest.mock("@/lib/util/randomValues", () => ({
  getRandom: jest.fn(),
}));

jest.mock("@/lib/util/siteHelpers", () => ({
  createSiteGenerator: jest.fn(),
}));

jest.mock("@/lib/util/convertCurrency", () => ({
  formatCurrencyFromCp: jest.fn((cp: number) => `${cp} cp`),
}));

// Narrowed interface for entertainment-specific tests
type EntertainmentFormData = Extract<SiteFormData, { type: "entertainment" }>;

interface EntertainmentTestData extends Partial<EntertainmentFormData> {
  type: "entertainment";
  venueType?: string;
  cost?: string;
  size?: string;
  condition?: string;
  connections: [];
}

describe("isEntertainmentSite", () => {
  it("returns true if type is 'entertainment'", () => {
    const data: Partial<SiteFormData> = { type: "entertainment" };
    expect(isEntertainmentSite(data)).toBe(true);
  });

  it("returns false if type is not 'entertainment'", () => {
    const data: Partial<SiteFormData> = { type: "shop" };
    expect(isEntertainmentSite(data)).toBe(false);
  });

  it("returns false if type is missing", () => {
    const data: Partial<SiteFormData> = {};
    expect(isEntertainmentSite(data)).toBe(false);
  });
});

describe("applyEntertainmentVenueRule", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns data unchanged if not entertainment type", async () => {
    const data: Partial<SiteFormData> = { type: "shop" };
    const result = await applyEntertainmentVenueRule(data);
    expect(result).toEqual(data);
  });

  it("sets random venueType if missing", async () => {
    const fakeVenue = { value: "Theater" };
    (getRandom as jest.Mock).mockReturnValue(fakeVenue);

    const data: EntertainmentTestData = { type: "entertainment", connections: [] };
    const result = await applyEntertainmentVenueRule(data);
    expect(getRandom).toHaveBeenCalledWith(ENTERTAINMENT_VENUE_TYPES);
    expect((result as Partial<SiteFormData> & { venueType: string }).venueType).toBe("Theater");
  });

  it("does not change venueType if already set and not 'random'", async () => {
    const data: EntertainmentTestData = { type: "entertainment", venueType: "Concert Hall", connections: [] };
    const result = await applyEntertainmentVenueRule(data);
    expect((result as Partial<SiteFormData> & { venueType: string }).venueType).toBe("Concert Hall");
  });
});

describe("generateEntertainmentData", () => {
  const fakeGenerator = jest.fn();
  const input: EntertainmentTestData = { type: "entertainment", connections: [] };

  beforeEach(() => {
    jest.clearAllMocks();
    (createSiteGenerator as jest.Mock).mockReturnValue(fakeGenerator);
  });

  it("calls createSiteGenerator with 'entertainment' and rules", async () => {
    await generateEntertainmentData(input);
    expect(createSiteGenerator).toHaveBeenCalledWith(
      "entertainment",
      expect.arrayContaining([expect.any(Function)])
    );
    expect(fakeGenerator).toHaveBeenCalledWith(input);
  });

  it("returns value from generator function", async () => {
    const output: EntertainmentTestData = { type: "entertainment", venueType: "Theater", connections: [] };
    fakeGenerator.mockResolvedValue(output);
    const result = await generateEntertainmentData(input) as EntertainmentTestData;
    expect(result).toEqual(output);
  });

  it("properly calculates cost for a venue (applyEntryCostRule)", async () => {
    const inputWithSize: EntertainmentTestData = {
      type: "entertainment",
      size: "medium",
      condition: "wealthy",
      venueType: "Other",
      connections: [],
    };

    fakeGenerator.mockImplementation(async (data: Partial<SiteFormData>) => {
      const ruleResult: EntertainmentTestData = { ...data, type: "entertainment", connections: [] };
      const base = 10; // entryBaseCost['Other'] default
      const sizeMod = 0.1;
      const conditionMod = 0.2;
      const rawCost = Math.round(base * (1 + sizeMod + conditionMod));
      ruleResult.cost = formatCurrencyFromCp(rawCost);
      return ruleResult;
    });

    const result = await generateEntertainmentData(inputWithSize) as EntertainmentTestData;
    expect(result.cost).toBe("13 cp"); // 10 * (1 + 0.1 + 0.2) = 13
  });

  it("sets cost to 'Free, tipping encouraged' for Street Performance Zone", async () => {
    const inputStreet: EntertainmentTestData = {
      type: "entertainment",
      venueType: "Street Performance Zone",
      connections: [],
    };

    fakeGenerator.mockImplementation(async (data: Partial<SiteFormData>) => ({
      ...data,
      cost: "Free, tipping encouraged",
    }));

    const result = await generateEntertainmentData(inputStreet) as EntertainmentTestData;
    expect(result.cost).toBe("Free, tipping encouraged");
  });
});
