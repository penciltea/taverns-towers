/**
 * Hook: useSettlementLoader
 *
 * Loads settlement data and associated sites (locations) with pagination.
 * Supports special "wilderness" mode, which generates a random environment context.
 * Manages loading state and pagination controls.
 */

import { useEffect, useState } from 'react';
import { useSettlementQuery } from '@/hooks/settlement/settlement.query';
import { useSiteContentStore } from '@/store/siteStore';
import { useUIStore } from '@/store/uiStore';
import { useSettlementContentStore } from '@/store/settlementStore';
import { usePaginatedSites } from '@/hooks/site/site.query';
import { generateWildernessContext } from '@/lib/modules/settlement/rules/settlement.dispatcher';

export function useSettlementLoader(settlementId: string | null) {
  // Store setters for updating settlement and site data globally
  const { setSelectedItem } = useSettlementContentStore();
  const { setItems: setSiteItems } = useSiteContentStore();
  const { setSettlementId } = useUIStore();

  // Local state to manage pagination and loading status
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  // Detect if the special "wilderness" settlementId is in use
  const isWilderness = settlementId === 'wilderness';

  // Fetch settlement data (null when wilderness)
  const { data: settlementData, isLoading: settlementLoading } = useSettlementQuery(isWilderness ? null : settlementId);
  const { data: siteData, isFetching: sitesLoading } = usePaginatedSites(isWilderness ? null : (settlementId as string), page, limit, "", []);

  // Generate wilderness environment context once on mount if in wilderness mode
  const [wildernessContext] = useState(() => (isWilderness ? generateWildernessContext() : null));

  // When in wilderness mode, set the generated context and mark loading as done
  useEffect(() => {
    if (isWilderness && wildernessContext) {
      useSettlementContentStore.getState().setContext?.(wildernessContext);
      setLoading(false);
    }
  }, [isWilderness, wildernessContext]);

  // When not wilderness, update stores with fetched data and set loading false
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

  // Return current settlement, sites, pagination, loading, and CRUD functions
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
