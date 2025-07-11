import { HiddenSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { SITE_CONDITION, SITE_SIZE, SECRECY_LEVELS } from '@/constants/site/site.options';

export const HiddenDetails = ({ site }: { site: HiddenSite }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
        <InfoListItem label="Security" value={site.secrecy?.length ? site.secrecy.map((value) => getLabelFromValue(SECRECY_LEVELS, value)).join(", ") : "N/A"} />
        <InfoListItem label="Leader(s)" value={site.leader} />
        <InfoListItem label="Known To" value={site.knownTo} />
        <InfoListItem label="Defense(s)" value={site.defenses} />
        <InfoListItem label="Purpose" value={site.purpose} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        <InfoListItem label="GM Notes" value={site.gmNotes} />
      </Box>
    </>
  );
};