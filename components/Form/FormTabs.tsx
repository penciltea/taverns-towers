import { Tabs, Tab, Select, MenuItem, FormControl, InputLabel, Box, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type FormTabsProps = {
  tab: number;
  setTab: (newTab: number) => void;
  labels: string[];               // Use constants for tab labels
  labelName?: string;             // For the input label ("Section" by default)
  ariaLabelPrefix?: string;       // For accessibility ("Settlement", "NPC", etc.)
};

export default function FormTabs({
  tab,
  setTab,
  labels,
  labelName = "Section",
  ariaLabelPrefix = "",
}: FormTabsProps) {
  const isMobile = useIsMobile();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setAnnouncement(`${ariaLabelPrefix ? ariaLabelPrefix + " " : ""}${labels[tab]} section selected`);
  }, [tab, labels, ariaLabelPrefix]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setTab(Number(event.target.value));
  };

  if (isMobile) {
    return (
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="form-tab-select-label">{labelName}</InputLabel>
          <Select
            labelId="form-tab-select-label"
            value={tab}
            label={labelName}
            onChange={handleChange}
          >
            {labels.map((label, index) => (
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
        {labels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
        {announcement}
      </div>
    </>
  );
}
