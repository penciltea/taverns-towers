import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Typography, Paper, Box } from "@mui/material";
import SettlementFormTabs from "./Tabs";
import SettlementFormBasics from "./Basics";
import SettlementFormWealth from "./Wealth";
import SettlementFormCulture from "./Culture";
import { SettlementFormData } from "@/schemas/settlement.schema";
import FormActions from "@/components/Form/FormActions";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useUIStore } from "@/store/uiStore";

type SettlementFormProps = {
  onSubmit: (data: SettlementFormData) => void;
  mode: "add" | "edit" | null;
};

function TabPanel({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settlement-tabpanel-${index}`}
      aria-labelledby={`settlement-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function SettlementForm({ onSubmit, mode }: SettlementFormProps) {
  const [tab, setTab] = useState(0);
  const methods = useFormContext<SettlementFormData>();
  const { handleSubmit } = methods;
  const { selectedItem } = useSettlementContentStore();
  const { isSubmitting } = useUIStore();

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h1" gutterBottom>
          {mode === "edit" ? `Edit ${selectedItem?.name}` : "Create Settlement"}
        </Typography>

        <SettlementFormTabs tab={tab} setTab={setTab} />

        <TabPanel value={tab} index={0}>
          <SettlementFormBasics />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <SettlementFormWealth />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <SettlementFormCulture />
        </TabPanel>

        <FormActions mode={mode} entityName="Settlement" isSubmitting={isSubmitting} />
      </Box>
    </Paper>
  );
}
