"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Typography, Paper } from "@mui/material";
import SettlementFormTabs from './Tabs';
import SettlementFormBasics from './Basics';
import SettlementFormWealth from './Wealth';
import SettlementFormCulture from './Culture';
import { SettlementFormData } from "@/schemas/settlementSchema";
import FormActions from "@/components/Form/FormActions";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useUIStore } from "@/store/uiStore";

type SettlementFormProps = {
  onSubmit: (data: SettlementFormData) => void;
  mode: "add" | "edit" | null;
};

export default function SettlementForm({ onSubmit, mode }: SettlementFormProps) {
  const [tab, setTab] = useState(0);
  const methods = useFormContext<SettlementFormData>();
  const { handleSubmit } = methods;
  const { selectedItem } = useSettlementContentStore();
  const { isSubmitting } = useUIStore();

  const tabComponents = [<SettlementFormBasics />, <SettlementFormWealth />, <SettlementFormCulture />];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          {mode === "edit" ? `Edit ${selectedItem?.name}` : "Create Settlement"}
        </Typography>

        <SettlementFormTabs tab={tab} setTab={setTab} />

        {tabComponents[tab]}

        <FormActions mode={mode} entityName="Settlement" isSubmitting={isSubmitting} />
      </form>
    </Paper>
  );
}