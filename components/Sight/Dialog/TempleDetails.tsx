import { TempleSight } from '@/interfaces/sight.interface';
import { List } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/sightOptions';

export const TempleDetails = ({ sight }: { sight: TempleSight }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, sight.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, sight.condition)} />   
        <InfoListItem label="Deity" value={sight.deity} />
        <InfoListItem label="Leader" value={sight.leader} />
        <InfoListItem label="Relics" value={sight.relics} />
        <InfoListItem label="Public Notes" value={sight.publicNotes} />
        <InfoListItem label="GM Notes" value={sight.gmNotes} />
      </List>

      <MenuList menu={sight.services || []} label="Services Offered" />
    </>
  );
};