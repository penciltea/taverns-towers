import { TavernLocation } from '@/interfaces/location.interface';
import { Typography, Box, List, ListItem } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';

export const TavernDetails = ({ location }: { location: TavernLocation }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={location.size} />
        <InfoListItem label="Condition" value={location.condition} />
        <InfoListItem label="Owner" value={location.owner} />
        <InfoListItem label="Clientele" value={location.clientele} />
        <InfoListItem label="Entertainment Offerings" value={location.entertainment} />
        <InfoListItem label="Room Cost per Night" value={location.cost} />
        <InfoListItem label="Public Notes" value={location.publicNotes} />
        <InfoListItem label="GM Notes" value={location.gmNotes} />
      </List>

      <MenuList menu={location.menu || []} label="Menu" />
    </>
  );
};