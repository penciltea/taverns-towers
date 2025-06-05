import { getRandomSubset } from "@/lib/util/randomValues";
import { TradeByTags } from "@/lib/models/generatorTradeByTags.model";
import { TradeByTerrain } from "@/lib/models/generatorTradeByTerrain.model";
import { TradeByClimate } from "@/lib/models/generatorTradeByClimate.model";
import { TradeNotesByTagMapping, TradeNotesByTerrainMapping, TradeNotesByClimateMapping } from "../mappings/trade.mappings";
import { NormalizedSettlementInput } from "./normalize";

export async function applyTradeNotesRule(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  try {
    if (
      !data.tradeNotes &&
      data.tags &&
      !data.tags.includes("random") &&
      data.terrain &&
      !data.terrain.includes("random") &&
      data.climate &&
      data.climate !== "random"
    ) {
      const [tagEntry, terrainEntries, climateEntry] = await Promise.all([
        TradeByTags.find({ tags: { $in: data.tags } }).lean(),
        TradeByTerrain.find({ terrain: { $in: data.terrain } }).lean(),
        TradeByClimate.findOne({ climate: data.climate }).lean(),
      ]);

      const tagNotes = tagEntry?.flatMap(entry => entry.trade) ?? [];
      const terrainNotes = terrainEntries?.flatMap(entry => entry.trade) ?? [];
      const climateNotes = climateEntry?.trade ?? [];

      const fallbackTagNotes = data.tags.flatMap(tag => TradeNotesByTagMapping[tag] ?? []);
      const fallbackTerrainNotes = data.terrain.flatMap(t => TradeNotesByTerrainMapping[t] ?? []);
      const fallbackClimateNotes = TradeNotesByClimateMapping[data.climate] ?? [];

      const allNotes = [
        ...tagNotes,
        ...terrainNotes,
        ...climateNotes,
        ...fallbackTagNotes,
        ...fallbackTerrainNotes,
        ...fallbackClimateNotes,
      ];

      const uniqueNotes = Array.from(new Set(allNotes));
      const selected = getRandomSubset(uniqueNotes, 1, 3);

      const formatted = selected.map((note, index) => {
        const lower = note.toLowerCase();
        let result = lower.charAt(0).toUpperCase() + lower.slice(1);

        // Add a period to the last note if it doesn't already have punctuation
        if (index === selected.length - 1 && !/[.!?]$/.test(result)) {
          result += ".";
        }

        return result;
      });

      data.tradeNotes = formatted.join(". ");;
    }
  } catch (err) {
    console.warn("applyTradeNotesRule failed, using local fallback:", err);

    const fallbackNotes = [
      ...(data.tags?.flatMap(tag => TradeNotesByTagMapping[tag] ?? []) ?? []),
      ...(data.terrain?.flatMap(t => TradeNotesByTerrainMapping[t] ?? []) ?? []),
      ...(data.climate ? TradeNotesByClimateMapping[data.climate] ?? [] : []),
    ];

    const uniqueNotes = Array.from(new Set(fallbackNotes));
    const selected = getRandomSubset(uniqueNotes, 1, 3);

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
  }

  return data;
}