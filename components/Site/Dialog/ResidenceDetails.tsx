'use client'

import { useSession } from 'next-auth/react';
import { ResidenceSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';
import { ConnectionsList } from './ConnectionsList';

export const ResidenceDetails = ({ site }: { site: ResidenceSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;

  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
        <InfoListItem label="Notable Features" value={site.notableFeatures} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />

        { user?.id === site.userId &&  (
          <InfoListItem label="GM Notes" value={site.gmNotes} />
        ) } 

      </Box>
      
      <ConnectionsList connections={site.connections} siteType="residence" />
    </>
  );
};