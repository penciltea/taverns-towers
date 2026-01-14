'use client'

import { Box, Typography, Button, Chip, Stack } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import InfoListItem from "@/components/Common/InfoListItem";
import { SiteTypeMap } from "@/interfaces/site.interface";
import { getTempleSiteDetails } from "@/lib/util/Fields/TempleFields";
import { getShopSiteDetails } from "@/lib/util/Fields/ShopFields";
import { getGuildSiteDetails } from "@/lib/util/Fields/GuildFields";
import { getTavernSiteDetails } from "@/lib/util/Fields/TavernFields";
import { getGovernmentSiteDetails } from "@/lib/util/Fields/GovernmentFields";
import { getEntertainmentSiteDetails } from "@/lib/util/Fields/EntertainmentFields";
import { getHiddenSiteDetails } from "@/lib/util/Fields/HiddenFields";
import { getResidenceSiteDetails } from "@/lib/util/Fields/ResidenceFields";
import { getMiscellaneousSiteDetails } from "@/lib/util/Fields/MiscellaneousFields";
import { siteTypeHasMenuType } from "@/lib/util/siteHelpers";

const getSiteDetailsMap = {
  tavern: getTavernSiteDetails,
  temple: getTempleSiteDetails,
  shop: getShopSiteDetails,
  guild: getGuildSiteDetails,
  government: getGovernmentSiteDetails,
  entertainment: getEntertainmentSiteDetails,
  hidden: getHiddenSiteDetails,
  residence: getResidenceSiteDetails,
  miscellaneous: getMiscellaneousSiteDetails,
} as const;

type SiteDetailsField = ReturnType<(typeof getSiteDetailsMap)[keyof typeof getSiteDetailsMap]>[number];

interface SiteDetailsProps<T extends keyof SiteTypeMap> {
  site: SiteTypeMap[T];
}

export default function SiteDetails<T extends keyof SiteTypeMap>({ site }: SiteDetailsProps<T>) {
  const { setOpenDialog } = useUIStore();

  const getDetails = getSiteDetailsMap[site.type as keyof typeof getSiteDetailsMap];
  const fields: SiteDetailsField[] = getDetails ? getDetails(site as never) : [];

  if (!site) {
    return <Typography>Loading site details...</Typography>;
  }

  return (
    <>
      <Box sx={{marginTop: 1}}>
        <Typography variant="h4" component="h2">Details</Typography>
        
        <Box>
          {fields.map((field) => {
            if (field.type === "chip") {
              return (
                <Stack direction={{ xs: "column", md: "row" }} key={field.label} component="dl" sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                  <Typography component="dt" fontWeight="bold" minWidth={200}>
                    {field.label}
                  </Typography>
                  {Array.isArray(field.value) && field.value.length > 0 ? (
                    <Stack direction="row" spacing={1} component="span" useFlexGap sx={{ flexWrap: "wrap", mt: 0.5 }}>
                        { field.value.map((value) => <Chip key={value} label={value} size="small" sx={{ my: 0.25 }} />) }
                    </Stack>            
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </Stack>
              );
            } else {
              // Only allow string | number | undefined here
              const value: string | number | undefined =
                typeof field.value === "string" || typeof field.value === "number"
                  ? field.value
                  : undefined;

              return <InfoListItem key={field.label} label={field.label} value={value ?? "N/A"} />;
            }
          })}
        </Box>
        {siteTypeHasMenuType(site.type) && 
          (
            <Button variant="outlined" color="secondary" onClick={() => setOpenDialog('siteMenuDialog', { site: site })}>View Menu</Button>
          ) 
        }
        
      </Box>
    </>
  );
}