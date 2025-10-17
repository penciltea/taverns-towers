'use client'

import { useSession } from 'next-auth/react';
import { GovernmentSite } from '@/interfaces/site.interface';
import { ConnectionsList } from './ConnectionsList';
import { getGovernmentDescriptions, getGovernmentSiteDetails } from '@/lib/util/Fields/GovernmentFields';
import SiteDetailsDescription from './DetailsDescriptions';

export const GovernmentDetails = ({ site }: { site: GovernmentSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;

  const details = getGovernmentSiteDetails(site);
  const descriptions = getGovernmentDescriptions(site).filter(f => !f.restricted || user?.id === site.userId);

  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />
      
      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="government" />
    </>
  );
};