'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSettlementFragment, { GeneratorSettlementFragmentPlain } from "@/lib/models/generatorSettlementFragment.model";
import { generateSettlementNameFromFragments } from "@/lib/util/generator/settlementNameGenerator";
import { normalizeSettlementInput, NormalizedSettlementInput } from "../modules/settlements/rules/normalize";
import { Settlement } from "@/interfaces/settlement.interface";

import { applyClimateRule, applyTagsByTerrainRule, applyTerrainBlacklistRule } from "../modules/settlements/rules/environment.rules";
import { applyDomainsByConditions } from "../modules/settlements/rules/domain.rules";
import { applyCrimeByWealthRule, applyRulingStyleBySizeRule, applyWealthBySizeRule } from "../modules/settlements/rules/law.rules";
import { applyMagicByWealthRule } from "../modules/settlements/rules/magic.rules";
import { applySizeRule } from "../modules/settlements/rules/size.rules";
import { applyTradeNotesByTags } from "../modules/settlements/rules/trade.rules";
import { applyHolidaysByConditions } from "../modules/settlements/rules/holiday.rules";
import { applyFolkloreByConditions } from "../modules/settlements/rules/folklore.rules";
import { applyRacesByTerrain } from "../modules/settlements/rules/race.rules";


const ruleFns = [
  applySizeRule,
  applyClimateRule,
  applyWealthBySizeRule,
  applyTerrainBlacklistRule,
  applyTagsByTerrainRule,
  applyRacesByTerrain,
  applyCrimeByWealthRule,
  applyRulingStyleBySizeRule,
  applyMagicByWealthRule,
  applyTradeNotesByTags,
  applyDomainsByConditions,
  applyHolidaysByConditions,
  applyFolkloreByConditions,
];

export async function generateSettlementName({
  terrain,
  tags,
}: {
  terrain: string[];
  tags: string[];
}): Promise<string> {
  await connectToDatabase();
  const rawFragments = await GeneratorSettlementFragment.find().lean();

  const fragments = (rawFragments as any[]).filter(
    (f): f is GeneratorSettlementFragmentPlain =>
      typeof f.type === "string" && typeof f.value === "string"
  );
  return generateSettlementNameFromFragments(fragments, { terrain, tags });
}

export async function generateSettlementData(
  input: Partial<Settlement>,
  rerollAll = false
): Promise<NormalizedSettlementInput & { name: string }> {
  await connectToDatabase();

  const baseInput = rerollAll
    ? {
        climate: "random",
        terrain: ["random"],
        tags: ["random"],
        // ...other defaults
      }
    : input;

  let data: NormalizedSettlementInput = normalizeSettlementInput(baseInput);

  for (const fn of ruleFns) {
    data = await fn(data);
  }

  // Generate name by calling the other server action
  const name = await generateSettlementName({
    terrain: data.terrain,
    tags: data.tags,
  });

  return {
    ...data,
    name,
  };
}