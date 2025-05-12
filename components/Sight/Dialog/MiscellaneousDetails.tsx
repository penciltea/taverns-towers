import { MiscellaneousSight } from '@/interfaces/sight.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { LOCATION_CONDITION, LOCATION_SIZE } from '@/constants/sightOptions';

export const MiscellaneousDetails = ({ sight }: { sight: MiscellaneousSight }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(LOCATION_SIZE, sight.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(LOCATION_CONDITION, sight.condition)} />
        <InfoListItem label="Features" value={sight.features} />
        <InfoListItem label="Use" value={sight.use} />
        <InfoListItem label="Public Notes" value={sight.publicNotes} />
        <InfoListItem label="GM Notes" value={sight.gmNotes} />
      </Box>
    </>
  );
};