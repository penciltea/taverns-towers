'use client'

import { useSession } from 'next-auth/react';
import { ShopSite } from '@/interfaces/site.interface';
import MenuList from './MenuList';
import { ConnectionsList } from './ConnectionsList';
import SiteDetailsDescription from './DetailsDescriptions';
import { getShopSiteDescriptions, getShopSiteDetails } from '@/lib/util/Fields/ShopFields';

export const ShopDetails = ({ site }: { site: ShopSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const details = getShopSiteDetails(site);
  const descriptions = getShopSiteDescriptions(site).filter(f => !f.restricted || user?.id === site.userId);

  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />
      
      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="shop" />

      <MenuList menu={site.menu || []} label="Wares" />
    </>
  );
};