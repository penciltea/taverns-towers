import { getRandomSubset } from "@/lib/util/randomValues";
import { TradeByTags, TradeByTagsModel } from "@/lib/models/generator/settlement/tradeByTags.model";
import { TradeByTerrain, TradeByTerrainModel } from "@/lib/models/generator/settlement/tradeByTerrain.model";
import { TradeByClimate, TradeByClimateModel } from "@/lib/models/generator/settlement/tradeByClimate.model";
import { TradeNotesByTagMapping, TradeNotesByTerrainMapping, TradeNotesByClimateMapping } from "../mappings/trade.mappings";
import { NormalizedSettlementInput } from "./normalize";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";

export async function applyTradeNotesRule(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  const shouldGenerate = (!data.tradeNotes || data.tradeNotes === "");
  if(!shouldGenerate) return data;

  // Fields used as factors for rules
  const tags = data.tags ?? [];
  const terrain = data.terrain ?? [];
  const climate = data.climate;

  // DB calls for populating arrays
  const results = await Promise.allSettled([
    TradeByTags.find({ tags: { $in: data.tags } }).lean<TradeByTagsModel[]>(),
    TradeByTerrain.find({ terrain: { $in: data.terrain } }).lean<TradeByTerrainModel[]>(),
    climate ? TradeByClimate.findOne({ climate: data.climate }).lean<TradeByClimateModel | null>() : Promise.resolve(null),
  ]);

  const terrainTradeNotes = extractArrayFromResult(
    results[0],
    (val) => val.trade,
    terrain.flatMap((terrain) => TradeNotesByTerrainMapping[terrain] ?? [])
  );

  const tagTradeNotes = extractArrayFromResult(
    results[1],
    (val) => val.trade,
    tags.flatMap((tag) => TradeNotesByTagMapping[tag] ?? [])
  );

  const climateTradeNotes = extractArrayFromResult(
    results[2],
    (val) => val.trade,
    climate ? TradeNotesByClimateMapping[climate] ?? [] : []
  );

  const combined = [
    ...terrainTradeNotes,
    ...tagTradeNotes,
    ...climateTradeNotes
  ];

  const uniqueNotes = Array.from(new Set(combined));
  const selected = getRandomSubset(uniqueNotes, { min: 1, max: 3 });

  const formatted = selected.map((note, index) => {
    const lower = note.toLowerCase();
    let result = lower.charAt(0).toUpperCase() + lower.slice(1);

    // Add a period to the last note if it doesn't already have punctuation
    if (index === selected.length - 1 && !/[.!?]$/.test(result)) {
      result += ".";
    }

    return result;
  });

  data.tradeNotes = formatted.join(". ");

  return data;
}