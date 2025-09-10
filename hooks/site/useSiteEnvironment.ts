// Hook used to give the app access to environmental context (climate, tags, terrain) for either:
// - A settlement loaded in from the DB
// - A site created outside of a settlement/in "wilderness" and with those fields generated procedurally

import type { Settlement } from "@/interfaces/settlement.interface";
import { generateWildernessContext } from "@/lib/modules/settlement/rules/settlement.dispatcher";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useState, useEffect, useMemo } from "react";
import { useSettlementLoader } from "@/hooks/settlement/useSettlementLoader";



export function useSiteEnvironment(settlementId: string) {

  // Determine if the site is in "wilderness" or in context of a settlement
  const isWilderness = settlementId === "wilderness";
  const settlementLoader = useSettlementLoader(isWilderness ? null : settlementId);
  const settlement = settlementLoader?.settlement;

  // If "wilderness", generate and hold data
  const [wildernessContext, setWildernessContext] = useState<{
    terrain?: string[];
    climate?: string;
    tags?: string[];
  } | null>(null);

  useEffect(() => {
    if (isWilderness) {
      generateWildernessContext().then(setWildernessContext);
    } else {
      setWildernessContext(null);
    }
  }, [isWilderness]);


  // Actual context creation
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

  // Push to Settlement Zustand store
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
