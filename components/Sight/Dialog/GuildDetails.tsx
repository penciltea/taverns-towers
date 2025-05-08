import { GuildSight } from '@/interfaces/sight.interface';
import { List } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/sightOptions';

export const GuildDetails = ({ sight }: { sight: GuildSight }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, sight.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, sight.condition)} />
        <InfoListItem label="Guild Name" value={sight.guildName} />
        <InfoListItem label="Guild Type" value={sight.guildType} />
        <InfoListItem label="Leader(s)" value={sight.leader} />
        <InfoListItem label="Membership Requirements" value={sight.membershipRequirements} />
        <InfoListItem label="Known Rivals" value={sight.knownRivals} />
        <InfoListItem label="Public Notes" value={sight.publicNotes} />
        <InfoListItem label="GM Notes" value={sight.gmNotes} />
      </List>

      <MenuList menu={sight.services || []} label="Wares" />
    </>
  );
};