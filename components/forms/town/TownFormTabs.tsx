"use client"

import { Tabs, Tab } from "@mui/material";
import { TOWN_TABS } from "@/constants/townOptions";

interface TownFormTabsProps {
    tab: number;
    setTab: (tab: number) => void;
  }

export default function TownFormTabs({ tab, setTab }: TownFormTabsProps) {
    return (
      <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)} sx={{ mb: 2 }}>
        {TOWN_TABS.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    );
}