import { ShopLocation } from '@/interfaces/location.interface';
import { List } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/locationOptions';

export const ShopDetails = ({ location }: { location: ShopLocation }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, location.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, location.condition)} />
        <InfoListItem label="Shop Type" value={location.shopType} />
        <InfoListItem label="Owner" value={location.owner} />
        <InfoListItem label="Public Notes" value={location.publicNotes} />
        <InfoListItem label="GM Notes" value={location.gmNotes} />
      </List>

      <MenuList menu={location.wares || []} label="Wares" />
    </>
  );
};