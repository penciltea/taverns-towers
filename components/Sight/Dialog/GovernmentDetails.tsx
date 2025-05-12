import { GovernmentSight } from '@/interfaces/sight.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE, SECURITY_LEVELS } from '@/constants/sightOptions';

export const GovernmentDetails = ({ sight }: { sight: GovernmentSight }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, sight.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, sight.condition)} />
        <InfoListItem label="Function" value={sight.function} />
        <InfoListItem label="Official(s)" value={sight.officials} />
        <InfoListItem label="Jurisdiction" value={sight.jurisdiction} />
        <InfoListItem label="Security" value={getLabelFromValue(SECURITY_LEVELS, sight.security)} />
        <InfoListItem label="Public Notes" value={sight.publicNotes} />
        <InfoListItem label="GM Notes" value={sight.gmNotes} />
      </Box>
    </>
  );
};