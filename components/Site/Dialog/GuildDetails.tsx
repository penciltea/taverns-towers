'use client'

import { useSession } from 'next-auth/react';
import { GuildSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';
import { GUILD_TYPES } from '@/constants/site/guild.options';

export function getGuildypeLabel(value: string): string {
  for (const category of GUILD_TYPES) {
    const match = category.options.find(option => option.value === value);
    if (match) return match.label;
  }
  return value; // fallback to raw value if not found
}

export const GuildDetails = ({ site }: { site: GuildSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;

  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Guild Type" value={site.guildType ? getGuildypeLabel(site.guildType) : "N/A"} />
        <InfoListItem label="Guild Name" value={site.guildName} />
        <InfoListItem label="Site Name" value={site.name} />
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />        
        <InfoListItem label="Leader(s)" value={site.leader} />
        <InfoListItem label="Membership Requirements" value={(site.membershipRequirements && site.membershipRequirements.length) ? site.membershipRequirements?.join(", ") : "N/A"} />
        <InfoListItem label="Known Rivals" value={site.knownRivals} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        { user?.id === site.userId &&  (
          <InfoListItem label="GM Notes" value={site.gmNotes} />
        ) }
      </Box>

      <MenuList menu={site.menu || []} label="Wares" />
    </>
  );
};