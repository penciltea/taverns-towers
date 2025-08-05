import { z } from "zod";
import { optionalEnum, optionalEnumArray } from "@/lib/util/zodHelpers";
import { CLIMATE_TYPES, TAG_TYPES, TERRAIN_TYPES } from "@/constants/environmentOptions";

export const environmentSchema = z.object({
  terrain: optionalEnumArray(TERRAIN_TYPES, "Invalid terrain type(s)"),
  climate: optionalEnum(CLIMATE_TYPES as [string, ...string[]], "Invalid climate"),
  tags: optionalEnumArray(TAG_TYPES, "Invalid tag(s)"),
});

export const defaultEnvironmentValues = {
    climate: "",
    terrain: [],
    tags: []
}