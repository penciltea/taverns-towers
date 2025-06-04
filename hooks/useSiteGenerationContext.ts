import { useEffect, useMemo, useState } from "react";
import { useSettlementLoader } from "@/hooks/useSettlementLoader";
import { generateWildernessContext } from "@/lib/modules/settlements/rules/settlement.rules";
import { useSettlementContentStore } from "@/store/settlementStore";

export function useSiteGenerationContext(settlementId: string) {
  const isWilderness = settlementId === "wilderness";
  const settlementLoader = useSettlementLoader(isWilderness ? null : settlementId);
  const settlement = settlementLoader?.settlement;

  const [wildernessContext, setWildernessContext] = useState<null | {
    terrain: string[];
    climate: string;
    tags: string[];
  }>(null);

  // Load wilderness context asynchronously if neededconst settlementLoader = useSettlementLoader(isWilderness ? null : settlementId);
  useEffect(() => {
    if (isWilderness) {
      generateWildernessContext().then(setWildernessContext);
    } else {
      setWildernessContext(null);
    }
  }, [isWilderness]);

  const context = useMemo(() => {
    if (isWilderness) {
      // Return the asynchronously loaded context or null while loading
      return wildernessContext;
    }
    if (settlement) {
      return {
        terrain: settlement.terrain,
        climate: settlement.climate,
        tags: settlement.tags,
      };
    }
    return null;
  }, [isWilderness, settlement, wildernessContext]);

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
