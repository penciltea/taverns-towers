import { HiddenSight } from '@/interfaces/sight.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE, SECRECY_LEVELS } from '@/constants/sightOptions';

export const HiddenDetails = ({ sight }: { sight: HiddenSight }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, sight.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, sight.condition)} />
        <InfoListItem label="Security" value={sight.secrecy?.length ? sight.secrecy.map((value) => getLabelFromValue(SECRECY_LEVELS, value)).join(", ") : "N/A"} />
        <InfoListItem label="Leader(s)" value={sight.leader} />
        <InfoListItem label="Known To" value={sight.knownTo} />
        <InfoListItem label="Defense(s)" value={sight.defenses} />
        <InfoListItem label="Purpose" value={sight.purpose} />
        <InfoListItem label="Public Notes" value={sight.publicNotes} />
        <InfoListItem label="GM Notes" value={sight.gmNotes} />
      </Box>
    </>
  );
};