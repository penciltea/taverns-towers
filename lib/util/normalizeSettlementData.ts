import { SettlementFormData } from "@/schemas/settlement.schema";

const normalizeArray = (arr?: string[]) => Array.isArray(arr) ? arr.filter(val => val.trim() !== "") : [];

export const normalizeSettlementData = (settlement: Partial<SettlementFormData>) => ({
  ...settlement,
  tags: normalizeArray(settlement.tags),
  terrain: normalizeArray(settlement.terrain),
  crime: normalizeArray(settlement.crime),
  domains: normalizeArray(settlement.domains),
  military: normalizeArray(settlement.military)
});
