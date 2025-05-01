import { MiscellaneousLocation } from '@/interfaces/location.interface';
import { List } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/locationOptions';

export const MiscellaneousDetails = ({ location }: { location: MiscellaneousLocation }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, location.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, location.condition)} />
        <InfoListItem label="Features" value={location.features} />
        <InfoListItem label="Use" value={location.use} />
        <InfoListItem label="Public Notes" value={location.publicNotes} />
        <InfoListItem label="GM Notes" value={location.gmNotes} />
      </List>
    </>
  );
};