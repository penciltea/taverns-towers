import { NormalizedSettlementInput } from "@/lib/modules/settlement/rules/normalize";

export const baseSettlementInput: NormalizedSettlementInput = {
  name: "TestTown",
  size: "Town",
  climate: "Temperate",
  terrain: ["Coast"],
  tags: ["port"],
  magic: "Low",
  wealth: "random",
  crime: ["random"],
  rulingStyle: "random",
  military: [],
  domains: [],
  folklore: "",
  tradeNotes: "",
  tone: [],
  theme: [],
  connections: [],
  userId: "user1",
  editors: [],
  favorite: false,
  isPublic: true,
};


/**
 * Factory function to create settlement test input with optional overrides.
 * Use this to avoid repeating boilerplate and keep tests consistent.
 */
export function makeSettlementInput(
  overrides: Partial<NormalizedSettlementInput> = {}
): NormalizedSettlementInput {
  return {
    ...structuredClone(baseSettlementInput), // deep clone so arrays/objects aren’t shared
    ...overrides,
  };
}