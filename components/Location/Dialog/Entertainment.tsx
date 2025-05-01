import { EntertainmentLocation } from '@/interfaces/location.interface';
import { List } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE, SECURITY_LEVELS } from '@/constants/locationOptions';

export const EntertainmentDetails = ({ location }: { location: EntertainmentLocation }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, location.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, location.condition)} />
        <InfoListItem label="Venue Type" value={location.venueType} />
        <InfoListItem label="Owner(s)" value={location.owner} />
        <InfoListItem label="Performances" value={location.performances} />
        <InfoListItem label="Cost" value={location.cost} />
        <InfoListItem label="Public Notes" value={location.publicNotes} />
        <InfoListItem label="GM Notes" value={location.gmNotes} />
      </List>
    </>
  );
};