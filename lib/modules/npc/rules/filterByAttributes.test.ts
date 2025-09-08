import { filterNpcByAttributes } from "./filterByAttributes";
import { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";
import { GenerateNpcNameOptions } from "@/interfaces/npc.interface";

describe("filterNpcByAttributes", () => {
  const fragments: GeneratorNpcFragmentPlain[] = [
    { value: "frag1", race: ["elf"], type: "first" },
    { value: "frag3", race: ["elf", "human"], type: "first" },
    { value: "frag4", race: [], type: "first" },
    { value: "frag5", race: undefined, type: "first" }
  ];

  it("returns all fragments if no race filter is provided", () => {
    const result = filterNpcByAttributes(fragments, {});
    expect(result).toHaveLength(4);
  });

  it("returns only matching race fragments", () => {
    const filters: GenerateNpcNameOptions = { race: ["elf"] };
    const result = filterNpcByAttributes(fragments, filters);

    const values = result.map(r => r.value);
    expect(values).toEqual(expect.arrayContaining(["frag1", "frag3", "frag4", "frag5"]));
    expect(values).not.toContain("frag2");
  });

  it("returns fragments when multiple filters overlap", () => {
    const filters: GenerateNpcNameOptions = { race: ["elf", "human"] };
    const result = filterNpcByAttributes(fragments, filters);

    const values = result.map(r => r.value);
    expect(values).toEqual(expect.arrayContaining(["frag1", "frag3", "frag4", "frag5"]));
  });

  it("treats race filters as case-insensitive", () => {
    const filters: GenerateNpcNameOptions = { race: ["ELF"] };
    const result = filterNpcByAttributes(fragments, filters);

    const values = result.map(r => r.value);
    expect(values).toEqual(expect.arrayContaining(["frag1", "frag3", "frag4", "frag5"]));
  });

  it("excludes fragments that do not match the race filter", () => {
    const filters: GenerateNpcNameOptions = { race: ["orc"] };
    const result = filterNpcByAttributes(fragments, filters);

    const values = result.map(r => r.value);
    // only universals survive
    expect(values).toEqual(expect.arrayContaining(["frag4", "frag5"]));
    expect(values).not.toContain("frag1");
    expect(values).not.toContain("frag3");
  });
});
