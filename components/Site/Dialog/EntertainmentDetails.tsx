'use client'

import { useSession } from 'next-auth/react';
import { EntertainmentSite } from '@/interfaces/site.interface';
import { ConnectionsList } from './ConnectionsList';
import { getEntertainmentDescriptions, getEntertainmentSiteDetails } from '@/lib/util/Fields/EntertainmentFields';
import SiteDetailsDescription from './DetailsDescriptions';

export const EntertainmentDetails = ({ site }: { site: EntertainmentSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const details = getEntertainmentSiteDetails(site);
  const descriptions = getEntertainmentDescriptions(site).filter(f => !f.restricted || user?.id === site.userId);

  
  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />
      
      <ConnectionsList connections={site.connections} pageSiteType="entertainment" />
    </>
  );
};