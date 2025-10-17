'use client'

import { useSession } from 'next-auth/react';
import { TavernSite } from '@/interfaces/site.interface';
import MenuList from './MenuList';
import { ConnectionsList } from './ConnectionsList';
import { getTavernSiteDescriptions, getTavernSiteDetails } from '@/lib/util/Fields/TavernFields';
import SiteDetailsDescription from './DetailsDescriptions';

export const TavernDetails = ({ site }: { site: TavernSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const details = getTavernSiteDetails(site);
  const descriptions = getTavernSiteDescriptions(site).filter(f => !f.restricted || user?.id === site.userId);

  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />
      
      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="tavern" />

      <MenuList menu={site.menu || []} label="Menu" />
    </>
  );
};