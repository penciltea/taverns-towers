'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSettlementFragment, { GeneratorSettlementFragmentPlain } from "@/lib/models/generatorSettlementFragment.model";
import { generateSettlementNameFromFragments } from "@/lib/util/generator/settlementNameGenerator";
import { normalizeSettlementInput, NormalizedSettlementInput } from "../modules/settlements/rules/normalize";
import { Settlement } from "@/interfaces/settlement.interface";

import { applyClimateRule, applyTerrainBlacklistRule } from "../modules/settlements/rules/environment.rules";
import { applyDomainsByConditions } from "../modules/settlements/rules/domain.rules";
import { applyWealthRule, applyCrimeByWealthRule, applyRulingStyleBySizeRule } from "../modules/settlements/rules/law.rules";
import { applyMagicByWealthRule } from "../modules/settlements/rules/magic.rules";
import { applySizeRule } from "../modules/settlements/rules/size.rules";
import { applyTradeNotesByTags } from "../modules/settlements/rules/trade.rules";
import { applyHolidaysByConditions } from "../modules/settlements/rules/holiday.rules";
import { applyFolkloreByConditions } from "../modules/settlements/rules/folklore.rules";


const ruleFns = [
  applySizeRule,
  applyClimateRule,
  applyWealthRule,
  applyTerrainBlacklistRule,
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

/**
 * Run full rule pipeline + generate name
 */
export async function generateSettlementData(
  input: Settlement
): Promise<NormalizedSettlementInput & { name: string }> {
  await connectToDatabase();

  let data: NormalizedSettlementInput = normalizeSettlementInput({
    climate: input.climate ?? "random",
    terrain: input.terrain ?? ["random"],
    tags: input.tags ?? ["random"],
    // Add other fallbacks/defaults if needed
  });

  for (const fn of ruleFns) {
    data = await fn(data);
  }

  const name = await generateSettlementName({
    terrain: data.terrain,
    tags: data.tags,
  });

  return {
    ...data,
    name,
  };
}
