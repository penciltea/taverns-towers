/**
 * Fetches NPCs and presents the NPC name for UI purposes
 */

import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { Npc } from "@/interfaces/npc.interface";
import { useMemo } from "react";

export function useNpcNames(npcIds?: string[]) {
  const { data: npcData } = useOwnedNpcsQuery({ page: 1, limit: 999 });

  return useMemo(() => {
    if (!npcIds || npcIds.length === 0) return "N/A";

    const npcMap = new Map<string, Npc>(npcData?.npcs.map((npc) => [npc._id, npc]) || []);
    const names = npcIds.map((id) => npcMap.get(id)?.name || "Unnamed NPC");
    
    return names.join(", ");
  }, [npcIds, npcData]);
}
