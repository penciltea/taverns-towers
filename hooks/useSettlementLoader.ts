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

  // === Wilderness fallback ===
  if (isWilderness) {
    const context = generateWildernessContext();

    // Set store context immediately
    useEffect(() => {
      useSettlementContentStore.getState().setContext?.(context);
    }, []);

    async function addSite(newSite: SiteType, _settlementId: string) {
      try {
        const savedSite = await createSite(newSite, 'wilderness');
        const store = useSiteContentStore.getState();
        const currentSites = store.allItems;

        store.setItems([...currentSites, savedSite]);
      } catch (error) {
        console.error('Error adding wilderness site:', error);
        showErrorDialog("There was a problem adding the site, please try again later!");
      }
    }

    function deleteSite(id: string) {
      const store = useSiteContentStore.getState();
      const currentItems = store.allItems;
      const filteredItems = currentItems.filter((loc) => loc._id !== id);
      store.setItems(filteredItems);
    }

    return {
      settlement: null,
      sites: [],
      page,
      setPage,
      limit,
      setLimit,
      totalPages: 1,
      loading: false,
      addSite,
      deleteSite,
    };
  }

  // === Standard settlement logic ===
  const { data: settlementData, isLoading: settlementLoading, refetch: refetchSettlement } = useSettlementQuery(settlementId);
  const { data: siteData, refetch: refetchSites, isFetching: sitesLoading } =
    usePaginatedSites(settlementId as string, page, limit, [], "");

  useEffect(() => {
    if (settlementData) {
      setSelectedItem(settlementData);
      setSettlementId(settlementData._id);
    }

    if (siteData) {
      setSiteItems(siteData.sites);
    }

    setLoading(false);
  }, [settlementData, siteData]);

  async function addSite(newSite: SiteType, settlementId: string) {
    try {
      const savedSite = await createSite(newSite, settlementId ?? 'wilderness');
      const store = useSiteContentStore.getState();
      const currentSites = store.allItems;

      store.setItems([...currentSites, savedSite]);
      await refetchSites();
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
    refetchSites();
  }

  return {
    settlement: settlementData,
    sites: siteData?.sites ?? [],
    page,
    setPage,
    limit,
    setLimit,
    totalPages: siteData?.totalPages ?? 1,
    loading: loading || sitesLoading,
    addSite,
    deleteSite,
  };
}
