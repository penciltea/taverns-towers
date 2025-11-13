'use client'

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useCampaignStore } from "@/store/campaignStore";
import { Spinner } from "@/components/Common/Spinner";
import FormActions from "@/components/Form/FormActions";
import { CampaignFormData } from "@/schemas/campaign.schema";
import { Paper, Box, Typography } from "@mui/material";
import { CAMPAIGN_TABS } from "@/constants/campaign.options";
import FormTabs from "@/components/Form/FormTabs";
import CamapignFormTabs from "./Tabs";

const CampaignFormBasics = dynamic(() => import("./Basics"), {
  ssr: false,
  loading: () => <Spinner />,
});

const CampaignFormConfiguration = dynamic(() => import("./Configuration"), {
  ssr: false,
  loading: () => <Spinner />,
});

type CampaignFormProps = {
    onSubmit: (data: CampaignFormData) => void;
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
      id={`campaign-tabpanel-${index}`}
      aria-labelledby={`campaign-tab-${index}`}
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
      labels={CAMPAIGN_TABS}
      ariaLabelPrefix="Campaign"
    />
  );
}


export default function CampaignForm({ onSubmit, mode }: CampaignFormProps) {
    const [tab, setTab] = useState(0);
    const { isSubmitting } = useUIStore();
    const router = useRouter();
    const { selectedCampaign, reset } = useCampaignStore();
    const [formError, setFormError] = useState<string | null>(null);
    const methods = useFormContext<CampaignFormData>();
    const { handleSubmit, formState: { errors }, register, control } = methods;

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
          const messages = Object.values(errors as FieldErrors<CampaignFormData>)
            .map((error) => error?.message || "Invalid field")
            .filter((msg) => msg !== "Please fix the highlighted errors before submitting:");
          setFormError(messages.join(" • "));
        } else {
          setFormError(null);
        }
    }, [errors]);

    function handleCancel(){
        reset();
        router.back();
    }

    


    return (
        <>
            {isSubmitting && <Spinner />}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {mode === "edit" ? `Edit ${selectedCampaign?.name}` : "Forge a Campaign"}
                    </Typography>

                    <CamapignFormTabs tab={tab} setTab={setTab} />

                    {formError && (
                        <Box sx={{ mb: 2 }}>
                            <Typography color="error" sx={{ fontWeight: 'bold' }}>Please fix the highlighted errors before submitting:</Typography>
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
                        { tab === 0 && <CampaignFormBasics /> }
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        { tab === 1 && <CampaignFormConfiguration /> }
                    </TabPanel>

                    

                    <FormActions mode={mode} entityName="Campaign" isSubmitting={isSubmitting} onCancel={handleCancel} />
                </Box>
            </Paper>
        </>
    )
}