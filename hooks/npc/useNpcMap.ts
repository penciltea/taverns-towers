'use client'

import { useMemo } from "react";
import { useOwnedNpcsQuery } from "./npc.query";
import { Npc } from "@/interfaces/npc.interface";


export default function useNpcMap() {
  const { data: npcs,  } = useOwnedNpcsQuery({}, { isEnabled: true });

  const npcMap = useMemo(() => {
    if (!npcs) return new Map<string, Npc>();
    return new Map<string, Npc>(npcs.npcs.map((npc) => [npc._id, npc]));
  }, [npcs]);

  return npcMap;
}