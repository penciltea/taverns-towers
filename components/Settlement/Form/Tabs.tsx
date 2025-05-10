import {
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import { SETTLEMENT_TABS } from "@/constants/settlementOptions";
import { useEffect, useState } from "react";

type Props = {
  tab: number;
  setTab: (newTab: number) => void;
};

function a11yProps(index: number) {
  return {
    id: `settlement-tab-${index}`,
    "aria-controls": `settlement-tabpanel-${index}`,
  };
}

export default function SettlementFormTabs({ tab, setTab }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // or "md" if you prefer

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setAnnouncement(`${SETTLEMENT_TABS[tab]} section selected`);
  }, [tab]);

  const handleChange = (event: any) => {
    setTab(event.target.value);
  };

  if (isMobile) {
    return (
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="settlement-tab-select-label">Section</InputLabel>
          <Select
            labelId="settlement-tab-select-label"
            value={tab}
            label="Section"
            onChange={handleChange}
          >
            {SETTLEMENT_TABS.map((label, index) => (
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
        {SETTLEMENT_TABS.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
      {SETTLEMENT_TABS[tab]} section selected
      </div>
    </>
  );
}
