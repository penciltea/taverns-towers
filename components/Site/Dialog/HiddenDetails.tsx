'use client'

import { useSession } from 'next-auth/react';
import { HiddenSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { SITE_CONDITION, SITE_SIZE, SECRECY_LEVELS } from '@/constants/site/site.options';
import { ConnectionsList } from './ConnectionsList';

export const HiddenDetails = ({ site }: { site: HiddenSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;

  
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
        <InfoListItem label="Security" value={site.secrecy?.length ? site.secrecy.map((value) => getLabelFromValue(SECRECY_LEVELS, value)).join(", ") : "N/A"} />
        <InfoListItem label="Known To" value={site.knownTo} />
        <InfoListItem label="Defense(s)" value={site.defenses} />
        <InfoListItem label="Purpose" value={site.purpose} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        { user?.id === site.userId &&  (
          <InfoListItem label="GM Notes" value={site.gmNotes} />
        ) }   
      </Box>
      
      <ConnectionsList connections={site.connections} variant="h6" pageSiteType="hidden" />
    </>
  );
};