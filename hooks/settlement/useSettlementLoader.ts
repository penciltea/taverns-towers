"use client";

import { useEffect, useState } from "react";
import { useSettlementQuery } from "@/hooks/settlement/settlement.query";
import { useSiteContentStore } from "@/store/siteStore";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { usePaginatedSites } from "@/hooks/site/site.query";

export function useSettlementLoader(settlementId: string | null) {
  // Store setters
  const { setSelectedItem } = useSettlementContentStore();
  const { setItems: setSiteItems } = useSiteContentStore();
  const { setSettlementId } = useUIStore();

  // Local state
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [wildernessContext, setWildernessContext] = useState<any>(null);

  const isWilderness = settlementId === "wilderness";

  // Fetch settlement and sites
  const { data: settlementData, isLoading: settlementLoading } = useSettlementQuery(
    isWilderness ? null : settlementId
  );
  const { data: siteData, isFetching: sitesLoading } = usePaginatedSites(
    isWilderness ? null : (settlementId as string),
    page,
    limit,
    "",
    [],
    []
  );

  // Lazy-load wilderness context only if needed
  useEffect(() => {
    if (isWilderness && !wildernessContext) {
      (async () => {
        const { generateWildernessContext } = await import(
          "@/lib/modules/settlement/rules/settlement.dispatcher"
        );
        const context = generateWildernessContext();
        setWildernessContext(context);
        useSettlementContentStore.getState().setContext?.(context);
        setLoading(false);
      })();
    }
  }, [isWilderness, wildernessContext]);

  // Update stores when settlement/sites are loaded
  useEffect(() => {
    if (!isWilderness) {
      if (settlementData) {
        setSelectedItem(settlementData);
        setSettlementId(settlementData._id);
      }

      if (siteData) {
        setSiteItems(siteData.sites);
      }

      setLoading(false);
    }
  }, [isWilderness, settlementData, siteData]);

  return {
    settlement: isWilderness ? null : settlementData,
    sites: isWilderness ? [] : siteData?.sites ?? [],
    page,
    setPage,
    limit,
    setLimit,
    totalPages: isWilderness ? 1 : siteData?.totalPages ?? 1,
    loading: loading || settlementLoading || sitesLoading,
  };
}
