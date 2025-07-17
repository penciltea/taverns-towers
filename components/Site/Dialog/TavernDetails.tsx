import { TavernSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';

export const TavernDetails = ({ site }: { site: TavernSite }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
        <InfoListItem label="Owner" value={site.owner} />
        <InfoListItem label="Clientele" value={site.clientele} />
        <InfoListItem label="Entertainment Offerings" value={site.entertainment?.length ? site.entertainment.join(', ') : 'N/A'} />
        <InfoListItem label="Room Cost per Night" value={site.cost} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        <InfoListItem label="GM Notes" value={site.gmNotes} />
      </Box>

      <MenuList menu={site.menu || []} label="Menu" />
    </>
  );
};