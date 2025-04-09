"use client"

import { Tabs, Tab } from "@mui/material";

interface TownFormTabsProps {
    tab: number;
    setTab: (tab: number) => void;
  }

const tabLabels = ["Basics", "Economics", "Culture", "Geography"];

export default function TownFormTabs({ tab, setTab }: TownFormTabsProps) {
    return (
      <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)} sx={{ mb: 2 }}>
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    );
}