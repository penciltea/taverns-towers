import { GovernmentSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { SITE_CONDITION, SITE_SIZE, SECURITY_LEVELS } from '@/constants/siteOptions';

export const GovernmentDetails = ({ site }: { site: GovernmentSite }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
        <InfoListItem label="Function" value={site.function} />
        <InfoListItem label="Official(s)" value={site.officials} />
        <InfoListItem label="Jurisdiction" value={site.jurisdiction} />
        <InfoListItem label="Security" value={getLabelFromValue(SECURITY_LEVELS, site.security)} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        <InfoListItem label="GM Notes" value={site.gmNotes} />
      </Box>
    </>
  );
};