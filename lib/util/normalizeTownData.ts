import { SettlementFormData } from "@/schemas/settlementSchema";

export const normalizeSettlementData = (settlement: Partial<SettlementFormData>) => ({
    ...settlement,
    tags: Array.isArray(settlement.tags) ? settlement.tags.filter(tag => tag.trim() !== "") : [],
    terrain: Array.isArray(settlement.terrain) ? settlement.terrain.filter(t => t.trim() !== "") : [],
    crime: Array.isArray(settlement.crime) ? settlement.crime.filter(c => c.trim() !== "") : [],
  });