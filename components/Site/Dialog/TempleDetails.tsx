import { TempleSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { SITE_CONDITION, SITE_SIZE } from '@/constants/siteOptions';

export const TempleDetails = ({ site }: { site: TempleSite }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />   
        <InfoListItem label="Deity" value={site.deity} />
        <InfoListItem label="Leader" value={site.leader} />
        <InfoListItem label="Relics" value={site.relics} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        <InfoListItem label="GM Notes" value={site.gmNotes} />
      </Box>

      <MenuList menu={site.services || []} label="Services Offered" />
    </>
  );
};