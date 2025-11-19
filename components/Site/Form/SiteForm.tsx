'use client'

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SiteFormData } from "@/schemas/site.schema";
import FormActions from "@/components/Form/FormActions";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import { SITE_CATEGORIES, SITE_TABS } from "@/constants/site/site.options";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/Common/Spinner";
import FormTabs from "@/components/Form/FormTabs";

const SiteFormBasics = dynamic(() => import("./Basics"), {
  ssr: false,
  loading: () => <Spinner />,
});

const SiteFormConnections = dynamic(() => import("./Connections"), {
  ssr: false,
  loading: () => <Spinner />,
});

const SiteFormConfiguration = dynamic(() => import("./Configuration"), {
  ssr: false,
  loading: () => <Spinner />,
});

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
      id={`site-tabpanel-${index}`}
      aria-labelledby={`site-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function SiteFormTabs({ tab, setTab }: { tab: number; setTab: (newTab: number) => void;}) {
  return (
    <FormTabs
      tab={tab}
      setTab={setTab}
      labels={SITE_TABS}
      ariaLabelPrefix="Site"
    />
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
      const messages = Object.values(errors as FieldErrors<SiteFormData>)
        .map((error) => error?.message || "Invalid field")
        .filter((msg) => msg !== "Please fix the highlighted errors before submitting:");
      setFormError(messages.join(" • "));
    } else {
      setFormError(null);
    }
  }, [errors]);

  const typeParam = mode === 'edit'
      ? selectedItem?.type
      : (searchParams?.get("type") as SiteFormData["type"]);
  
  const typeLabel = typeParam
    ? getLabelFromValue(SITE_CATEGORIES, typeParam, "Unknown")
    : "Unknown";

  function handleCancel(){
    clearSelectedItem();
    history.back();
  }

  return (
    <>
      {isSubmitting && <Spinner />}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }} >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" gutterBottom>
            {mode === 'edit' ? `Edit ${selectedItem?.name}` : `Create Site (${typeLabel})`}
          </Typography>

          <Typography variant="subtitle1" component="p" gutterBottom>
              Whether you like to craft every detail or just need a quick spark of inspiration, you can manually fill in the fields below or use the <strong>Generate</strong> buttons to populate them.
          </Typography>

          <Typography variant="subtitle1" component="p" gutterBottom>
              The generator fills in all site details like size, condition, and other characteristics. Fields set to &quot;random&quot; will be updated based on your other selections, so some options may influence others.
          </Typography>

          <Typography variant="subtitle1" component="p" gutterBottom>
              Experiment! Use the buttons to fill missing or random fields, or to fully reroll all details. You can always adjust results afterward to fine-tune your site.
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
            { tab === 0 && <SiteFormBasics generator={generator} isWilderness={isWilderness} mode={mode} /> }
          </TabPanel>
          <TabPanel value={tab} index={1}>
            { tab === 1 && <SiteFormConnections mode={mode} /> }
          </TabPanel>
          <TabPanel value={tab} index={2}>
            { tab === 2 && <SiteFormConfiguration /> }
          </TabPanel>

          <FormActions isSubmitting={isSubmitting} mode={mode} entityName="Site" onCancel={handleCancel} />
        </Box>
      </Paper>
    </>
  );
}