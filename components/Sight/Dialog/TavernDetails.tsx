import { TavernSight } from '@/interfaces/sight.interface';
import { Box } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/sightOptions';

export const TavernDetails = ({ sight }: { sight: TavernSight }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, sight.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, sight.condition)} />
        <InfoListItem label="Owner" value={sight.owner} />
        <InfoListItem label="Clientele" value={sight.clientele} />
        <InfoListItem label="Entertainment Offerings" value={sight.entertainment} />
        <InfoListItem label="Room Cost per Night" value={sight.cost} />
        <InfoListItem label="Public Notes" value={sight.publicNotes} />
        <InfoListItem label="GM Notes" value={sight.gmNotes} />
      </Box>

      <MenuList menu={sight.menu || []} label="Menu" />
    </>
  );
};