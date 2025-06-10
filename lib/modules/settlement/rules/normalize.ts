import { CommonInterface } from "@/interfaces/common.interface";
import { Settlement } from "@/interfaces/settlement.interface";
import { normalizeEnvironmentInput } from "@/lib/modules/environment/environment.rules";
import { EnvironmentInterface } from "@/interfaces/environment.interface";

// All required fields after normalization
export type NormalizedSettlementInput = Omit<Settlement, keyof CommonInterface | 'isPublic'> &
  Required<EnvironmentInterface> & {
    size: string;
    magic: string;
    rulingStyle: string;
    wealth: string;
    crime: string[];
    domains: string[];
  };

export function normalizeSettlementInput(data: Partial<Settlement>): NormalizedSettlementInput {
  const env = normalizeEnvironmentInput(data);

  return {
    ...data,
    ...env, // injects terrain, climate, and tags
    size: !data.size || data.size.trim() === "" ? "random" : data.size,
    magic: !data.magic || data.magic.trim() === "" ? "random" : data.magic,
    rulingStyle: !data.rulingStyle || data.rulingStyle.trim() === "" ? "random" : data.rulingStyle,
    wealth: !data.wealth || data.wealth.trim() === "" ? "random" : data.wealth,
    crime: !data.crime || data.crime.length === 0 ? ["random"] : data.crime,
    domains: !data.domains || data.domains.length === 0 ? ["random"] : data.domains,
  };
}