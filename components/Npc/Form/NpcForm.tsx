import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Typography, Paper, Box, Button } from "@mui/material";
import { NpcFormData } from "@/schemas/npc.schema";
import FormActions from "@/components/Form/FormActions";
import { useNpcContentStore } from "@/store/npc.store";
import { useUIStore } from "@/store/uiStore";
import NpcFormTabs from "./Tabs";
import NpcFormConnections from "./Connections";
import NpcFormBasics from "./Basics";

type NpcFormProps = {
  onSubmit: (data: NpcFormData) => void;
  mode: "add" | "edit" | null;
  generator?: {
    name: () => void;
    missing: () => void;
    reroll: () => void;
  };
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
      id={`Npc-tabpanel-${index}`}
      aria-labelledby={`Npc-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function NpcForm({ onSubmit, mode, generator }: NpcFormProps) {
  const [tab, setTab] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const methods = useFormContext<NpcFormData>();
  const { handleSubmit, formState: { errors } } = methods;
  const { selectedItem, clearSelectedItem } = useNpcContentStore();
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
    clearSelectedItem();
    history.back();
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} >
      <Typography variant="h3" component="h1" gutterBottom>
        {mode === "edit" ? `Edit ${selectedItem?.name}` : "Forge an NPC"}
      </Typography>
      
      <Typography variant="subtitle1" component="p" gutterBottom>
        Whether you prefer to craft every detail or need a quick spark of inspiration, you can manually fill in the fields below or use the <strong>Generate</strong> buttons to populate them.
      </Typography>

      <Typography variant="subtitle1" component="p" gutterBottom>
        The generator fills in all NPC details—like age, race, traits, and more. Fields set to "random" will be chosen based on your other selections.
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
            onClick={generator?.missing}
            color="secondary"
            size="large"
            sx={{ mt: 2, py: 1.65 }}
        >
            Generate Missing Fields
        </Button>
        <Button
            type="button"
            variant="outlined"
            onClick={generator?.reroll}
            size="large"
            sx={{ mt: 2, py: 1.65 }}
        >
            Reroll All Fields
        </Button>
      </Box>

      <NpcFormTabs tab={tab} setTab={setTab} />

      
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
        <NpcFormBasics generator={generator} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <NpcFormConnections />
      </TabPanel>

      <FormActions mode={mode} entityName="Npc" isSubmitting={isSubmitting} onCancel={handleCancel} />
    </Box>
  );
}
