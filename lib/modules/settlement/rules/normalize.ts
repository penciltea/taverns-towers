import { Settlement } from "@/interfaces/settlement.interface";
import { normalizeEnvironmentInput } from "@/lib/modules/environment/environment.rules";
import { EnvironmentInterface } from "@/interfaces/environment.interface";
import { normalizeCommonInput } from "@/lib/util/normalizeData";

// All required fields after normalization
export type NormalizedSettlementInput = 
  Omit<Settlement, '_id' | 'createdAt' | 'updatedAt'> & 
  Required<EnvironmentInterface> & {
    size: string;
    magic: string;
    rulingStyle: string;
    wealth: string;
    crime: string[];
    domains: string[];
    military: string[];
    tone: string[];
    theme: string[];
};


export function normalizeSettlementInput(data: Partial<Settlement>): NormalizedSettlementInput {
  const env = normalizeEnvironmentInput(data);
  const common = normalizeCommonInput(data);

  return {
    ...common,
    ...env,
    theme: data.theme?.length ? data.theme : [],
    tone: data.tone?.length ? data.tone : [],
    size: data.size?.trim() || "random",
    magic: data.magic?.trim() || "random",
    rulingStyle: data.rulingStyle?.trim() || "random",
    military: data.military?.length ? data.military : ["random"],
    wealth: data.wealth?.trim() || "random",
    crime: data.crime?.length ? data.crime : ["random"],
    domains: data.domains?.length ? data.domains : ["random"],
    map: data.map,
    races: data.races,
    tradeNotes: data.tradeNotes,
    holidays: data.holidays,
    folklore: data.folklore,
    connections: data.connections?.length ? data.connections : []
  };
}