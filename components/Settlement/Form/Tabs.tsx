"use client"

import { Tabs, Tab } from "@mui/material";
import { SETTLEMENT_TABS } from "@/constants/settlementOptions";
import { SettlementFormTabsProps } from "@/interfaces/settlement.interface";

export default function SettlementFormTabs({ tab, setTab }: SettlementFormTabsProps) {
    return (
      <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)} sx={{ mb: 2 }}>
        {SETTLEMENT_TABS.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    );
}