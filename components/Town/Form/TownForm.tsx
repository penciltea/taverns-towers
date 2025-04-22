"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import TownFormTabs from './Tabs';
import TownFormBasics from './Basics';
import TownFormWealth from './Wealth';
import TownFormCulture from './Culture';
import { TownFormData } from "@/schemas/townSchema";

type TownFormProps = {
  onSubmit: (data: TownFormData) => void;
  mode: "add" | "edit" | null;
};

export default function TownForm({ onSubmit, mode }: TownFormProps) {
  const [tab, setTab] = useState(0);
  const methods = useFormContext<TownFormData>();
  const { handleSubmit } = methods;

  const tabComponents = [<TownFormBasics />, <TownFormWealth />, <TownFormCulture />];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        {mode === "edit" ? "Edit Town" : "Create Town"}
      </Typography>

      <TownFormTabs tab={tab} setTab={setTab} />

      {tabComponents[tab]}

      <Button type="submit" variant="contained" sx={{ mt: 3 }} size="large">
        {mode === "edit" ? "Update" : "Create"} Town
      </Button>
      <Button
        type="button"
        variant="outlined"
        sx={{ marginTop: 3, marginLeft: 3 }}
        size="small"
        onClick={() => history.back()}
      >
        Cancel
      </Button>
    </form>
  );
}