'use client'

import { useSession } from 'next-auth/react';
import { TempleSite } from '@/interfaces/site.interface';
import MenuList from './MenuList';
import { ConnectionsList } from './ConnectionsList';
import { getTempleSiteDescriptions, getTempleSiteDetails } from '@/lib/util/Fields/TempleFields';
import SiteDetailsDescription from './DetailsDescriptions';

export const TempleDetails = ({ site }: { site: TempleSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const details = getTempleSiteDetails(site);
  const descriptions = getTempleSiteDescriptions(site).filter(f => !f.restricted || user?.id === site.userId);

  
  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />
      
      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="temple" />

      <MenuList menu={site.menu || []} label="Services Offered" />
    </>
  );
};