import { CommonInterface } from "@/interfaces/common.interface";
import { Settlement } from "@/interfaces/settlement.interface";

export type NormalizedSettlementInput = Omit<Settlement, keyof CommonInterface | 'isPublic'> & {
  size: string;
  terrain: string[];
  tags: string[];
  climate: string;
  magic: string;
  rulingStyle: string;
  wealth: string;
  crime: string[];
  domains: string[],
};

export function normalizeSettlementInput(data: Partial<Settlement>): NormalizedSettlementInput {
  return {
    ...data,
    size: !data.size || data.size.trim() === "" ? "random" : data.size,
    terrain: !data.terrain || data.terrain.length === 0 ? ["random"] : data.terrain,
    tags: !data.tags || data.tags.length === 0 ? ["random"] : data.tags,
    climate: !data.climate || data.climate.trim() === "" ? "random" : data.climate,
    magic: !data.magic || data.magic.trim() === "" ? "random" : data.magic,
    rulingStyle: !data.rulingStyle || data.rulingStyle.trim() === "" ? "random" : data.rulingStyle,
    wealth: !data.wealth || data.wealth.trim() === "" ? "random" : data.wealth,
    crime: !data.crime || data.crime.length === 0 ? ["random"] : data.crime,
    domains: !data.domains || data.domains.length === 0 ? ["random"] : data.domains,
  };
}