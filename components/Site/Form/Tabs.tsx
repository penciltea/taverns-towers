import { Tabs, Tab, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { SITE_TABS } from "@/constants/site/site.options";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = {
  tab: number;
  setTab: (newTab: number) => void;
};

export default function SiteFormTabs({ tab, setTab }: Props) {
  const isMobile = useIsMobile();

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setAnnouncement(`${SITE_TABS[tab]} section selected`);
  }, [tab]);

  const handleChange = (event: any) => {
    setTab(event.target.value);
  };

  if (isMobile) {
    return (
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="Site-tab-select-label">Section</InputLabel>
          <Select
            labelId="Site-tab-select-label"
            value={tab}
            label="Section"
            onChange={handleChange}
          >
            {SITE_TABS.map((label, index) => (
              <MenuItem key={label} value={index}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, newTab) => setTab(newTab)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          mb: 2,
          width: "100%",
          '& .MuiTab-root': { whiteSpace: "nowrap" },
          '& .MuiTabs-scroller': {
            overflowX: "auto !important",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          },
          '& .MuiTabs-scroller::-webkit-scrollbar': {
            display: "none",
          },
        }}
      >
        {SITE_TABS.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
      {SITE_TABS[tab]} section selected
      </div>
    </>
  );
}
