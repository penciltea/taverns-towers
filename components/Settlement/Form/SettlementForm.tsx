import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Typography, Paper, Box, Button } from "@mui/material";
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
  onGenerate: () => void;
  onReroll: () => void;
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

export default function SettlementForm({ onSubmit, mode, onGenerate, onReroll }: SettlementFormProps) {
  const [tab, setTab] = useState(0);
  const methods = useFormContext<SettlementFormData>();
  const { handleSubmit } = methods;
  const { selectedItem } = useSettlementContentStore();
  const { isSubmitting } = useUIStore();

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h1" gutterBottom>
          {mode === "edit" ? `Edit ${selectedItem?.name}` : "Forge a Settlement"}
        </Typography>
        
        <Typography variant="subtitle1" component="p" gutterBottom>Whether you're a cartographer of great renown or simply in need of inspiration, you may <strong>manually</strong> craft each detail of your settlement below — or let the fates decide with the <strong>generate</strong> button.</Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>The generator will conjure up a complete set of details — from terrain and climate to crime levels and ruling styles. If you leave a dropdown set to "random", the generator will work its magic and select an appropriate option based on your other choices when you save your work.</Typography>
          
        <Typography variant="subtitle1" component="p" gutterBottom>Feel free to tweak the results to your liking!</Typography>

        <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'flex-end', 
            marginTop: 2,
            marginBottom: { xs: 5, sm: 2}, // for mobile sizing
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Button
              type="button"
              variant="contained"
              onClick={onGenerate}
              size="large"
              sx={{ mt: 2, py: 1.65 }}
          >
              Generate Missing Fields
          </Button>
          <Button
              type="button"
              variant="outlined"
              onClick={onReroll}
              size="large"
              sx={{ mt: 2, py: 1.65 }}
          >
              Reroll All Fields
          </Button>
        </Box>

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
