import { HiddenLocation } from '@/interfaces/location.interface';
import { List } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE, SECRECY_LEVELS } from '@/constants/locationOptions';

export const HiddenDetails = ({ location }: { location: HiddenLocation }) => {
  return (
    <>
      <List>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, location.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, location.condition)} />
        <InfoListItem label="Security" value={location.secrecy?.length ? location.secrecy.map((value) => getLabelFromValue(SECRECY_LEVELS, value)).join(", ") : "N/A"} />
        <InfoListItem label="Leader(s)" value={location.leader} />
        <InfoListItem label="Known To" value={location.knownTo} />
        <InfoListItem label="Defense(s)" value={location.defenses} />
        <InfoListItem label="Purpose" value={location.purpose} />
        <InfoListItem label="Public Notes" value={location.publicNotes} />
        <InfoListItem label="GM Notes" value={location.gmNotes} />
      </List>
    </>
  );
};