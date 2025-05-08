import { ShopSight } from '@/interfaces/sight.interface';
import { List } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/sightOptions';

export const ShopDetails = ({ sight }: { sight: ShopSight }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, sight.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, sight.condition)} />
        <InfoListItem label="Shop Type" value={sight.shopType} />
        <InfoListItem label="Owner" value={sight.owner} />
        <InfoListItem label="Public Notes" value={sight.publicNotes} />
        <InfoListItem label="GM Notes" value={sight.gmNotes} />
      </List>

      <MenuList menu={sight.wares || []} label="Wares" />
    </>
  );
};