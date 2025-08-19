'use client';

import { useMemo } from "react";
import { useOwnedSitesQuery } from "@/hooks/site/site.query"; // your query hook
import { SiteType } from "@/interfaces/site.interface";

export default function useSiteMap() {
  const { data: sitesData } = useOwnedSitesQuery({}, { isEnabled: true });

  const siteMap = useMemo(() => {
    if (!sitesData?.sites) return new Map<string, SiteType>();
    return new Map<string, SiteType>(
      sitesData.sites.map((site) => [site._id, site])
    );
  }, [sitesData]);

  return siteMap;
}
