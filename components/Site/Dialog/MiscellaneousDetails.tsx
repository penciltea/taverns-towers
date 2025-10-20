'use client'

import { useSession } from 'next-auth/react';
import { MiscellaneousSite } from '@/interfaces/site.interface';
import { ConnectionsList } from './ConnectionsList';
import { getMiscellaneousSiteDescriptions, getMiscellaneousSiteDetails } from '@/lib/util/Fields/MiscellaneousFields';
import SiteDetailsDescription from './DetailsDescriptions';

export const MiscellaneousDetails = ({ site }: { site: MiscellaneousSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const details = getMiscellaneousSiteDetails(site);
  const descriptions = getMiscellaneousSiteDescriptions(site).filter(f => !f.restricted || user?.id === site.userId);

  return (
    <>
      <SiteDetailsDescription details={details} descriptions={descriptions} />
      
      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="miscellaneous" />
    </>
  );
};