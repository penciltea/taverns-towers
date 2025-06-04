'use server';

import { applyClimateRule, applyTerrainBlacklistRule, applyTagsByTerrainRule } from "@/lib/modules/environment/environment.rules";
import { EnvironmentInterface } from "@/interfaces/environment.interface";
import { normalizeEnvironmentInput } from "../modules/environment/environment.rules";

export async function generateEnvironment(
  input: Partial<EnvironmentInterface>,
  force: boolean = false
): Promise<EnvironmentInterface> {
  let data = normalizeEnvironmentInput(input);

  // for fully regenerating new environmental details
  if (force) {
    data.climate = "random";
    data.terrain = ["random"];
    data.tags = ["random"];
  }

  data = applyClimateRule(data);
  data = await applyTerrainBlacklistRule(data);
  data = await applyTagsByTerrainRule(data);

  return data;
}