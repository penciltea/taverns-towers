import { useEffect, useState } from 'react';
import { useSettlementQuery } from '@/hooks/settlement.query';
import { useSiteContentStore } from '@/store/siteStore';
import { useUIStore } from '@/store/uiStore';
import { SiteType } from '@/interfaces/site.interface';
import { usePaginatedSites } from './site.query';
import { useSettlementContentStore } from '@/store/settlementStore';
import { createSite } from '@/lib/actions/site.actions';
import { generateWildernessContext } from '@/lib/modules/settlements/rules/settlement.rules';

export function useSettlementLoader(settlementId: string | null) {
  const { setSelectedItem } = useSettlementContentStore();
  const { setItems: setSiteItems } = useSiteContentStore();
  const { setSettlementId, showErrorDialog } = useUIStore();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const isWilderness = settlementId === 'wilderness';

  // Call these hooks unconditionally but pass undefined/null when wilderness
  const { data: settlementData, isLoading: settlementLoading, refetch: refetchSettlement } = useSettlementQuery(isWilderness ? null : settlementId);
  const { data: siteData, refetch: refetchSites, isFetching: sitesLoading } = usePaginatedSites(isWilderness ? null : (settlementId as string), page, limit, [], "");

  // For wilderness, generate context once
  const [wildernessContext] = useState(() => (isWilderness ? generateWildernessContext() : null));

  useEffect(() => {
    if (isWilderness && wildernessContext) {
      useSettlementContentStore.getState().setContext?.(wildernessContext);
      setLoading(false);
    }
  }, [isWilderness, wildernessContext]);

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

  async function addSite(newSite: SiteType, id: string) {
    try {
      const savedSite = await createSite(newSite, isWilderness ? 'wilderness' : id);
      const store = useSiteContentStore.getState();
      const currentSites = store.allItems;

      store.setItems([...currentSites, savedSite]);

      if (!isWilderness) {
        await refetchSites();
      }
    } catch (error) {
      console.error('Error adding site:', error);
      showErrorDialog("There was a problem adding the site, please try again later!");
    }
  }

  function deleteSite(id: string) {
    const store = useSiteContentStore.getState();
    const currentItems = store.allItems;
    const filteredItems = currentItems.filter((loc) => loc._id !== id);
    store.setItems(filteredItems);

    if (!isWilderness) {
      refetchSites();
    }
  }

  return {
    settlement: isWilderness ? null : settlementData,
    sites: isWilderness ? [] : siteData?.sites ?? [],
    page,
    setPage,
    limit,
    setLimit,
    totalPages: isWilderness ? 1 : siteData?.totalPages ?? 1,
    loading: loading || settlementLoading || sitesLoading,
    addSite,
    deleteSite,
  };
}
