'use client'

import { useSession } from 'next-auth/react';
import { ResidenceSite } from '@/interfaces/site.interface';
import { ConnectionsList } from './ConnectionsList';
import SiteDetailsDescription from './DetailsDescriptions';
import { getResidenceSiteDescriptions, getResidenceSiteDetails } from '@/lib/util/Fields/ResidenceFields';

export const ResidenceDetails = ({ site }: { site: ResidenceSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const details = getResidenceSiteDetails(site);
  const descriptions = getResidenceSiteDescriptions(site).filter(f => !f.restricted || user?.id === site.userId);

  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />
      
      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="residence" />
    </>
  );
};