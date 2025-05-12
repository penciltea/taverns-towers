import { EntertainmentSight } from '@/interfaces/sight.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE, SECURITY_LEVELS } from '@/constants/sightOptions';

export const EntertainmentDetails = ({ sight }: { sight: EntertainmentSight }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, sight.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, sight.condition)} />
        <InfoListItem label="Venue Type" value={sight.venueType} />
        <InfoListItem label="Owner(s)" value={sight.owner} />
        <InfoListItem label="Performances" value={sight.performances} />
        <InfoListItem label="Cost" value={sight.cost} />
        <InfoListItem label="Public Notes" value={sight.publicNotes} />
        <InfoListItem label="GM Notes" value={sight.gmNotes} />
      </Box>
    </>
  );
};