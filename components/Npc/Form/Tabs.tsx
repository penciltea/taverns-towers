import { Tabs, Tab, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { NPC_TABS } from "@/constants/npc.options";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = {
  tab: number;
  setTab: (newTab: number) => void;
};

export default function NpcFormTabs({ tab, setTab }: Props) {
  const isMobile = useIsMobile();

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setAnnouncement(`${NPC_TABS[tab]} section selected`);
  }, [tab]);

  const handleChange = (event: any) => {
    setTab(event.target.value);
  };

  if (isMobile) {
    return (
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="npc-tab-select-label">Section</InputLabel>
          <Select
            labelId="npc-tab-select-label"
            value={tab}
            label="Section"
            onChange={handleChange}
          >
            {NPC_TABS.map((label, index) => (
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
        {NPC_TABS.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
      {NPC_TABS[tab]} section selected
      </div>
    </>
  );
}
