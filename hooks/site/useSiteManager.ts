/**
 * A hook for establishing site mutation (add/edit) permissions. 
 * ToDo: Add Auth Layer permissions
 */

import { useSiteContentStore } from "@/store/siteStore";
import { useUIStore } from "@/store/uiStore";
import { useOwnedSitesQuery } from "@/hooks/site/site.query";
import { SiteType } from "@/interfaces/site.interface";
import { handleActionResult } from "../queryHook.util";

export function useSiteManager(settlementId: string | null) {
  const isWilderness = settlementId === "wilderness";
  const { setItems, allItems } = useSiteContentStore();
  const { showErrorDialog } = useUIStore();
  const { refetch } = useOwnedSitesQuery(
    { page: 1, limit: 12, types: [], tone: [], favorite: false },
    { isEnabled: !isWilderness } // only fetch for non-wilderness settlements
  );

  /**
   * Adds a new site, updates store, and refetches if applicable
   */
  async function addSite(newSite: SiteType) {
    try {
      const { createSite } = await import('@/lib/actions/site.actions');
      const result = await createSite(newSite, isWilderness ? "wilderness" : settlementId!);
      const saved = handleActionResult(result);
      setItems([...allItems, saved]);

      if (!isWilderness) {
        await refetch();
      }
    } catch (error) {
      console.error("Error adding site:", error);
      showErrorDialog("There was a problem adding the site, please try again later!");
    }
  }

  /**
   * Deletes a site from store and refetches if applicable
   */
  async function deleteSite(siteId: string) {
    const filtered = allItems.filter((site) => site._id !== siteId);
    setItems(filtered);

    if (!isWilderness) {
      await refetch();
    }
  }

  return { addSite, deleteSite };
}