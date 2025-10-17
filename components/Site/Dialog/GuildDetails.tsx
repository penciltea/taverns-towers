'use client'

import { useSession } from 'next-auth/react';
import { GuildSite } from '@/interfaces/site.interface';
import MenuList from './MenuList';
import { ConnectionsList } from './ConnectionsList';
import { getGuildSiteDescriptions, getGuildSiteDetails } from '@/lib/util/Fields/GuildFields';
import SiteDetailsDescription from './DetailsDescriptions';


export const GuildDetails = ({ site }: { site: GuildSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const details = getGuildSiteDetails(site);
  const descriptions = getGuildSiteDescriptions(site).filter(f => !f.restricted || user?.id === site.userId)

  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />

      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="guild" />

      <MenuList menu={site.menu || []} label="Wares" />
    </>
  );
};