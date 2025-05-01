import { GovernmentLocation } from '@/interfaces/location.interface';
import { List } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE, SECURITY_LEVELS } from '@/constants/locationOptions';

export const GovernmentDetails = ({ location }: { location: GovernmentLocation }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, location.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, location.condition)} />
        <InfoListItem label="Function" value={location.function} />
        <InfoListItem label="Official(s)" value={location.officials} />
        <InfoListItem label="Jurisdiction" value={location.jurisdiction} />
        <InfoListItem label="Security" value={getLabelFromValue(SECURITY_LEVELS, location.security)} />
        <InfoListItem label="Public Notes" value={location.publicNotes} />
        <InfoListItem label="GM Notes" value={location.gmNotes} />
      </List>
    </>
  );
};