import { generateNpcNameFromFragments } from "./generateNpcNameFromFragments";
import * as filterModule from "./filterByAttributes";
import * as groupModule from "./groupNpcFragmentsByType";
import * as randomUtils from "@/lib/util/randomValues";
import { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";
import { NpcGroupKey } from "@/interfaces/npc.interface";

describe("generateNpcNameFromFragments", () => {
  const fragments: GeneratorNpcFragmentPlain[] = [
    { value: "Sir", type: "prefix" as NpcGroupKey, race: [] },
    { value: "Smith", type: "last" as NpcGroupKey, race: [] },
    { value: "John", type: "first" as NpcGroupKey, race: [] },
    { value: "Johnny", type: "nickname" as NpcGroupKey, race: [] },
  ];

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("replaces template keys with selected fragments", () => {
    // Spy on dependencies
    jest.spyOn(filterModule, "filterNpcByAttributes").mockReturnValue(fragments);
    jest.spyOn(groupModule, "groupNpcFragmentsByType").mockReturnValue({
      prefix: [fragments[0]],
      first: [fragments[2]],
      last: [fragments[1]],
      nickname: [fragments[3]],
      suffix: [],
      fullName: [],
      format: [],
    });
    jest.spyOn(randomUtils, "getRandom").mockImplementation(arr => arr[0]);
    jest.spyOn(randomUtils, "weightedRandom").mockImplementation(arr => arr[0]);

    const name = generateNpcNameFromFragments({
      fragments,
      filters: {},
      fallbackFormats: ["{{prefix}} {{first}} {{last}}", "{{first}} {{last}}"],
    });

    expect(name).toBe("Sir John Smith");
  });

  it("falls back to default format if no valid templates", () => {
    // Filter returns fragments but all groups empty
    jest.spyOn(filterModule, "filterNpcByAttributes").mockReturnValue(fragments);
    jest.spyOn(groupModule, "groupNpcFragmentsByType").mockReturnValue({
        prefix: [],
        first: [],
        last: [],
        nickname: [],
        suffix: [],
        fullName: [],
        format: [],
    });

    // weightedRandom returns "" for any empty pool
    jest.spyOn(randomUtils, "weightedRandom").mockImplementation(arr => arr[0] || "");

    const name = generateNpcNameFromFragments({
        fragments,
        filters: {},
        fallbackFormats: [], // no templates provided
    });

    // All keys replaced with empty strings → result is two spaces
    expect(name).toBe(" "); 
    });

  it("uses allowedKeys to ignore unknown template keys", () => {
    // Filter returns all fragments normally
    jest.spyOn(filterModule, "filterNpcByAttributes").mockReturnValue(fragments);

    jest.spyOn(groupModule, "groupNpcFragmentsByType").mockReturnValue({
        first: [fragments[2]], // John
        last: [fragments[1]],  // Smith
        prefix: [],
        suffix: [],
        nickname: [],
        fullName: [],
        format: [],
    });

    // Select the first fragment from the pool
    jest.spyOn(randomUtils, "weightedRandom").mockImplementation(arr => arr[0]);

    const name = generateNpcNameFromFragments({
        fragments,
        filters: {},
        fallbackFormats: ["{{unknown}} {{first}} {{last}}"],
        allowedKeys: ["first", "last"], // unknown key ignored
    });

    // unknown key → "", first → John, last → Smith
    expect(name).toBe(" John Smith");
    });

  it("reuses fragments if pool is exhausted", () => {
    const poolFragment = { value: "Solo", type: "first" as NpcGroupKey, race: [] };
    jest.spyOn(filterModule, "filterNpcByAttributes").mockReturnValue([poolFragment]);
    jest.spyOn(groupModule, "groupNpcFragmentsByType").mockReturnValue({
      first: [poolFragment],
      last: [],
      prefix: [],
      suffix: [],
      nickname: [],
      fullName: [],
      format: [],
    });
    jest.spyOn(randomUtils, "weightedRandom").mockReturnValue(poolFragment);

    const name = generateNpcNameFromFragments({
      fragments: [poolFragment],
      filters: {},
      fallbackFormats: ["{{first}} {{first}}"],
      allowedKeys: ["first"],
    });

    expect(name).toBe("Solo Solo"); // reuses fragment if exhausted
  });
});
