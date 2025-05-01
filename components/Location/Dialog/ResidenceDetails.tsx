import { ResidenceLocation } from '@/interfaces/location.interface';
import { List } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/locationOptions';

export const ResidenceDetails = ({ location }: { location: ResidenceLocation }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, location.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, location.condition)} />
        <InfoListItem label="Occupant(s)" value={location.occupant} />
        <InfoListItem label="Notable Features" value={location.notableFeatures} />
        <InfoListItem label="Public Notes" value={location.publicNotes} />
        <InfoListItem label="GM Notes" value={location.gmNotes} />
      </List>
    </>
  );
};