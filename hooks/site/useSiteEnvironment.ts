'use client';

import type { Settlement } from "@/interfaces/settlement.interface";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useState, useEffect, useMemo } from "react";
import { useSettlementLoader } from "@/hooks/settlement/useSettlementLoader";

export function useSiteEnvironment(settlementId: string) {
  const isWilderness = settlementId === "wilderness";
  const settlementLoader = useSettlementLoader(isWilderness ? null : settlementId);
  const settlement = settlementLoader?.settlement;

  // Hold wilderness-generated context
  const [wildernessContext, setWildernessContext] = useState<{
    terrain?: string[];
    climate?: string;
    tags?: string[];
  } | null>(null);

  // Generate wilderness context lazily
  useEffect(() => {
    if (!isWilderness) {
      setWildernessContext(null);
      return;
    }

    (async () => {
      const { generateWildernessContext } = await import(
        "@/lib/modules/settlement/rules/settlement.dispatcher"
      );
      const context = await generateWildernessContext();
      setWildernessContext(context);
    })();
  }, [isWilderness]);

  // Create actual context object
  const context: Partial<Settlement> = useMemo(() => {
    if (isWilderness) {
      return {
        terrain: wildernessContext?.terrain,
        climate: wildernessContext?.climate,
        tags: wildernessContext?.tags,
      };
    }

    return settlement || {};
  }, [isWilderness, settlement, wildernessContext]);

  // Push to Zustand store
  useEffect(() => {
    if (context) {
      useSettlementContentStore.getState().setContext?.(context);
    }
  }, [context]);

  return {
    context,
    isWilderness,
    settlement,
  };
}
