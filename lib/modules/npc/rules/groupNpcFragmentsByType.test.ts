import { groupNpcFragmentsByType } from "./groupNpcFragmentsByType";
import { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";

describe("groupNpcFragmentsByType", () => {
  const fragments: GeneratorNpcFragmentPlain[] = [
    { value: "Sir", type: "prefix", race: [] },
    { value: "Smith", type: "last", race: [] },
    { value: "John", type: "first", race: [] },
    { value: "Johnny", type: "nickname", race: [] },
    { value: "Jr.", type: "suffix", race: [] },
    { value: "The Brave", type: "fullName", race: [] },
    { value: "{{first}} {{last}}", type: "format", race: [] },
  ];

  it("correctly groups fragments by type", () => {
    const grouped = groupNpcFragmentsByType(fragments);

    expect(grouped.prefix).toEqual([{ value: "Sir", type: "prefix", race: [] }]);
    expect(grouped.first).toEqual([{ value: "John", type: "first", race: [] }]);
    expect(grouped.last).toEqual([{ value: "Smith", type: "last", race: [] }]);
    expect(grouped.nickname).toEqual([{ value: "Johnny", type: "nickname", race: [] }]);
    expect(grouped.suffix).toEqual([{ value: "Jr.", type: "suffix", race: [] }]);
    expect(grouped.fullName).toEqual([{ value: "The Brave", type: "fullName", race: [] }]);
    expect(grouped.format).toEqual([{ value: "{{first}} {{last}}", type: "format", race: [] }]);
  });

  it("returns empty arrays for types with no fragments", () => {
    const emptyGrouped = groupNpcFragmentsByType([]);
    expect(emptyGrouped.prefix).toEqual([]);
    expect(emptyGrouped.first).toEqual([]);
    expect(emptyGrouped.last).toEqual([]);
    expect(emptyGrouped.nickname).toEqual([]);
    expect(emptyGrouped.suffix).toEqual([]);
    expect(emptyGrouped.fullName).toEqual([]);
    expect(emptyGrouped.format).toEqual([]);
  });
});
