'use client'

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Paper, Typography, Box, Button } from "@mui/material";
import { SiteFormData } from "@/schemas/site.schema";
import FormActions from "@/components/Form/FormActions";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import SiteFormTabs from "./Tabs";
import SiteFormBasics from "./Basics";
import SiteFormConnections from "./Connections";
import { siteFormFieldsByType } from "./FieldsByType";
import { SITE_CATEGORIES } from "@/constants/site/site.options";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { useSearchParams } from "next/navigation";

type SiteFormProps = {
  onSubmit: (data: SiteFormData) => void;
  mode: "add" | "edit" | null;
  isWilderness: boolean;
  generator?: {
    name: () => void;
    menuItems: () => void;
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
      id={`settlement-tabpanel-${index}`}
      aria-labelledby={`settlement-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function SiteForm({ onSubmit, mode, isWilderness, generator }: SiteFormProps) {
  const [tab, setTab] = useState(0);
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);
  const methods = useFormContext<SiteFormData>();
  const { handleSubmit, formState: { errors } } = methods;
  const { selectedItem, clearSelectedItem } = useSiteContentStore();
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

  const typeParam = mode === 'edit'
      ? selectedItem?.type
      : (searchParams?.get("type") as SiteFormData["type"]);
  
  const SpecificFieldsComponent = typeParam && siteFormFieldsByType[typeParam];
  const typeLabel = typeParam
    ? getLabelFromValue(SITE_CATEGORIES, typeParam, "Unknown")
    : "Unknown";

  function handleCancel(){
    clearSelectedItem();
    history.back();
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }} >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          {mode === 'edit' ? `Edit ${selectedItem?.name}` : `Create Site (${typeLabel})`}
        </Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>
            Whether you prefer to craft every detail or need a quick spark of inspiration, you can manually fill in the fields below or use the <strong>Generate</strong> buttons to populate them.
        </Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>
            The generator fills in all site details—like size, condition, and more. Fields set to "random" will be chosen based on your other selections.
        </Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>
            Use the buttons to either fill missing/random fields or to fully reroll all fields. You can always adjust results afterward!
        </Typography>

        <Box sx={{
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginTop: 2,
          marginBottom: { xs: 5, sm: 2 },
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button
            type="button"
            variant="contained"
            onClick={generator?.missing}
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

        <SiteFormTabs tab={tab} setTab={setTab} />

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
          <SiteFormBasics generator={generator} isWilderness={isWilderness} mode={mode} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <SiteFormConnections />
        </TabPanel>

        <FormActions isSubmitting={isSubmitting} mode={mode} entityName="Site" onCancel={handleCancel} />
      </Box>
    </Paper>
  );
}