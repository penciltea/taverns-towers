import { GovernmentSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';
import { GOVERNMENT_FUNCTIONS, SECURITY_LEVELS } from '@/constants/site/government.options';

export function getGovernmentTypeLabel(value: string): string {
  for (const category of GOVERNMENT_FUNCTIONS) {
    const match = category.options.find(option => option.value === value);
    if (match) return match.label;
  }
  return value; // fallback to raw value if not found
}

export const GovernmentDetails = ({ site }: { site: GovernmentSite }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Function" value={site.function ? getGovernmentTypeLabel(site.function) : "N/A"} />
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
        <InfoListItem label="Official(s)" value={site.officials} />
        <InfoListItem label="Security" value={getLabelFromValue(SECURITY_LEVELS, site.security)} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        <InfoListItem label="GM Notes" value={site.gmNotes} />
      </Box>
    </>
  );
};