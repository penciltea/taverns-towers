'use client'

import { useSession } from 'next-auth/react';
import { HiddenSite } from '@/interfaces/site.interface';
import { ConnectionsList } from './ConnectionsList';
import { getHiddenSiteDescriptions, getHiddenSiteDetails } from '@/lib/util/Fields/HiddenFields';
import SiteDetailsDescription from './DetailsDescriptions';

export const HiddenDetails = ({ site }: { site: HiddenSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const details = getHiddenSiteDetails(site);
  const descriptions = getHiddenSiteDescriptions(site).filter(f => !f.restricted || user?.id === site.userId);

  
  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />
      
      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="hidden" />
    </>
  );
};