'use client';

import { useMemo } from "react";
import { useOwnedSettlementsQuery } from "@/hooks/settlement/settlement.query";
import { Settlement } from "@/interfaces/settlement.interface";

export default function useSettlementMap() {
  const { data: settlementsData } = useOwnedSettlementsQuery({}, { isEnabled: true });

  const settlementMap = useMemo(() => {
    if (!settlementsData?.settlements) return new Map<string, Settlement>();
    return new Map<string, Settlement>(
      settlementsData.settlements.map((settlement) => [settlement._id, settlement])
    );
  }, [settlementsData]);

  return settlementMap;
}
