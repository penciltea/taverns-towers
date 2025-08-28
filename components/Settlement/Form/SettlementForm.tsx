import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import SettlementFormConnections from "./Connections";

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
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const methods = useFormContext<SettlementFormData>();
  const { handleSubmit, formState: { errors } } = methods;
  const { selectedItem, clearDraftItem } = useSettlementContentStore();
  const { isSubmitting } = useUIStore();

  useEffect(() => {
      if (Object.keys(errors).length > 0) {
        const messages = Object.values(errors)
          .map((error: any) => error.message || "Invalid field")
          .filter((msg) => msg !== "Please fix the highlighted errors before submitting:");
        setFormError(messages.join(" • "));
      } else {
        setFormError(null);
      }
    }, [errors]);

  function handleCancel(){
    clearDraftItem();
    router.back();
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h1" gutterBottom>
          {mode === "edit" ? `Edit ${selectedItem?.name}` : "Forge a Settlement"}
        </Typography>
        
        <Typography variant="subtitle1" component="p" gutterBottom>
          Whether you prefer to craft every detail or need a quick spark of inspiration, you can manually fill in the fields below or use the <strong>Generate</strong> buttons to populate them.
        </Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>
          The generator fills in all settlement details—like terrain, climate, crime, and ruling style. Fields set to &quot;random&quot; will be chosen based on your other selections.
        </Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>
          Use the buttons to either fill missing/random fields or to fully reroll all fields. You can always adjust results afterward!
        </Typography>


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
              color="secondary"
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

        {formError && (
          <Box sx={{ mb: 2 }}>
            <Typography color="error" sx={{ fontWeight: 'bold' }}>
              Please fix the highlighted errors before submitting:
            </Typography>
            <ul style={{ color: '#d32f2f', marginTop: 4, marginBottom: 0, paddingLeft: 24 }}>
              {formError.split(" • ").map((message, idx) => (
                <li key={idx}>
                  <Typography component="span" variant="body2">{message}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}

        <TabPanel value={tab} index={0}>
          <SettlementFormBasics />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <SettlementFormWealth />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <SettlementFormCulture />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <SettlementFormConnections />
        </TabPanel>

        <FormActions mode={mode} entityName="Settlement" isSubmitting={isSubmitting} onCancel={handleCancel} />
      </Box>
    </Paper>
  );
}
