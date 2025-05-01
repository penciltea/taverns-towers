import { GuildLocation } from '@/interfaces/location.interface';
import { List } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/locationOptions';

export const GuildDetails = ({ location }: { location: GuildLocation }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, location.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, location.condition)} />
        <InfoListItem label="Guild Name" value={location.guildName} />
        <InfoListItem label="Leader(s)" value={location.leader} />
        <InfoListItem label="Membership Requirements" value={location.membershipRequirements} />
        <InfoListItem label="Known Rivals" value={location.knownRivals} />
        <InfoListItem label="Public Notes" value={location.publicNotes} />
        <InfoListItem label="GM Notes" value={location.gmNotes} />
      </List>

      <MenuList menu={location.services || []} label="Wares" />
    </>
  );
};