import { EntertainmentSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { ENTERTAINMENT_VENUE_TYPES, SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';

export const EntertainmentDetails = ({ site }: { site: EntertainmentSite }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Venue Type" value={getLabelFromValue(ENTERTAINMENT_VENUE_TYPES, site.venueType)} />
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />        
        <InfoListItem label="Cost" value={site.cost} />
        <InfoListItem label="Owner(s)" value={site.owner} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        <InfoListItem label="GM Notes" value={site.gmNotes} />
      </Box>
    </>
  );
};