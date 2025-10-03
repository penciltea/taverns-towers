import { getRandomSubset } from "@/lib/util/randomValues";
import { TradeNotesByTagMapping, TradeNotesByTerrainMapping, TradeNotesByClimateMapping } from "../mappings/trade.mappings";
import { NormalizedSettlementInput } from "./normalize";

export function applyTradeNotesRule(data: NormalizedSettlementInput) {
  const shouldGenerate = (!data.tradeNotes || data.tradeNotes === "");
  if(!shouldGenerate) return data;

  // Fields used as factors for rules
  const tags = data.tags ?? [];
  const terrain = data.terrain ?? [];
  const climate = data.climate;

  const terrainTradeNotes = terrain.flatMap((terrain) => TradeNotesByTerrainMapping[terrain] ?? []);
  const tagTradeNotes = tags.flatMap((tag) => TradeNotesByTagMapping[tag] ?? []);
  const climateTradeNotes = climate ? TradeNotesByClimateMapping[climate] ?? [] : [];

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