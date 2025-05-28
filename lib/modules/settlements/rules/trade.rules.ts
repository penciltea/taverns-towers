import { getRandomSubset } from "@/lib/util/randomValues";
import { TradeNotesByTag } from "../mappings/trade.mappings";
import { NormalizedSettlementInput } from "./normalize";

// Logic for applying trade notes by tags

export function applyTradeNotesByTags(data: NormalizedSettlementInput): NormalizedSettlementInput{
  if (
    (!data.tradeNotes || data.tradeNotes.trim() === "") &&
    Array.isArray(data.tags) &&
    !data.tags.includes("random") &&
    data.tags.length > 0
  ) {
    const allTradeNotes = data.tags.flatMap((t) => TradeNotesByTag[t] || []);
    const uniqueNotes = Array.from(new Set(allTradeNotes));
    const selectedNotes = getRandomSubset(uniqueNotes, 1, 3);
    data.tradeNotes = selectedNotes.join("; ");

    if (selectedNotes.length > 0) {
      const formattedNotes = selectedNotes.map((note, i) => {
        if (i === 0) return note; // keep first as-is (assuming it's capitalized already)
        return note.charAt(0).toLowerCase() + note.slice(1);
      });

      data.tradeNotes = formattedNotes.join("; ");
    }
  }
  
  return data;
}
