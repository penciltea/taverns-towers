"use client";

import { useEffect, useState } from "react";
import { useSettlementQuery } from "@/hooks/settlement/settlement.query";
import { useSiteContentStore } from "@/store/siteStore";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useOwnedSitesQuery } from "@/hooks/site/site.query";
import { SiteQueryParams, DefaultSiteQueryParams } from "@/interfaces/site.interface";
import { useAuthStore } from "@/store/authStore";

export function useSettlementLoader(settlementId: string | null) {
  // Store setters
  const { setSelectedItem } = useSettlementContentStore();
  const { setItems: setSiteItems } = useSiteContentStore();
  const { setSettlementId } = useUIStore();
  const user = useAuthStore(state => state.user);

  // Local state
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [wildernessContext, setWildernessContext] = useState<any>(null);

  const isWilderness = settlementId === "wilderness";
  const [params, setParams] = useState<SiteQueryParams>({
    ...DefaultSiteQueryParams
  });
  
  useEffect(() => {
    if (user) {
      setParams({ ...DefaultSiteQueryParams });
    }
  }, [user]);

  // Fetch settlement and sites
  const { data: settlementData, isLoading: settlementLoading } = useSettlementQuery(
    isWilderness ? null : settlementId
  );
  const { data: siteData, isFetching: sitesLoading } = useOwnedSitesQuery(params!, {
    isEnabled: !!params
  });

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
