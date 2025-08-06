import { useMemo } from "react";
import { useOwnedNpcsQuery } from "./npc.query";
import { useOwnedSettlementsQuery } from "./settlement.query";
import { useOwnedSitesQuery } from "./site.query";

export function useUserOwnedItemMaps() {
  const { data: settlementsData, isLoading: settlementsLoading } = useOwnedSettlementsQuery({}, { isEnabled: true });
  const { data: sitesData, isLoading: sitesLoading } = useOwnedSitesQuery({}, { isEnabled: true });
  const { data: npcsData, isLoading: npcsLoading } = useOwnedNpcsQuery({}, { isEnabled: true });

  const settlementMap = useMemo(() => {
    const map = new Map();
    settlementsData?.settlements.forEach(s => map.set(s._id, s.name));
    return map;
  }, [settlementsData]);

  const siteMap = useMemo(() => {
    const map = new Map();
    sitesData?.sites.forEach(s => map.set(s._id, s.name));
    return map;
  }, [sitesData]);

  const npcMap = useMemo(() => {
    const map = new Map();
    npcsData?.npcs.forEach(n => map.set(n._id, n.name));
    return map;
  }, [npcsData]);

  return {
    loading: settlementsLoading || sitesLoading || npcsLoading,
    maps: {
      settlementMap,
      siteMap,
      npcMap,
    },
  };
}