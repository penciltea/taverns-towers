"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Typography, Paper } from "@mui/material";
import TownFormTabs from './Tabs';
import TownFormBasics from './Basics';
import TownFormWealth from './Wealth';
import TownFormCulture from './Culture';
import { TownFormData } from "@/schemas/townSchema";
import FormActions from "@/components/Form/FormActions";
import { useTownContentStore } from "@/store/townStore";
import { useUIStore } from "@/store/uiStore";

type TownFormProps = {
  onSubmit: (data: TownFormData) => void;
  mode: "add" | "edit" | null;
};

export default function TownForm({ onSubmit, mode }: TownFormProps) {
  const [tab, setTab] = useState(0);
  const methods = useFormContext<TownFormData>();
  const { handleSubmit } = methods;
  const { selectedItem } = useTownContentStore();
  const { isSubmitting } = useUIStore();

  const tabComponents = [<TownFormBasics />, <TownFormWealth />, <TownFormCulture />];

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
          {mode === "edit" ? `Edit ${selectedItem?.name}` : "Create Town"}
        </Typography>

        <TownFormTabs tab={tab} setTab={setTab} />

        {tabComponents[tab]}

        <FormActions mode={mode} entityName="Town" isSubmitting={isSubmitting} />
      </form>
    </Paper>
  );
}