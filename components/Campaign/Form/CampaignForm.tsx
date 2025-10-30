'use client'

import { useEffect, useState } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useCampaignStore } from "@/store/campaignStore";
import { Spinner } from "@/components/Common/Spinner";
import FormActions from "@/components/Form/FormActions";
import { CampaignFormData } from "@/schemas/campaign.schema";
import { Paper, Box, Typography } from "@mui/material";
import { FormChipSelect, FormTextField } from "@/components/Form";
import { TONE } from "@/constants/common.options";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormChipInput from "@/components/Form/FormChipInput";
import { GENRES } from "@/constants/campaign.options";
import FormRoleAssignmentInput from "@/components/Form/FormRoleAssignmentInput";

type CmapgignFormProps = {
    onSubmit: (data: CampaignFormData) => void;
    mode: "add" | "edit" | null;
};

export default function CampaignForm({ onSubmit, mode }: CmapgignFormProps) {
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

    const roles = [
        { label: 'Player', value: 'player' },
        { label: 'Editor', value: 'editor' },
    ];


    return (
        <>
            {isSubmitting && <Spinner />}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {mode === "edit" ? `Edit ${selectedCampaign?.name}` : "Forge a Campaign"}
                    </Typography>

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

                    <FormTextField
                        label="Campaign Name"
                        registration={register("name")}
                        fieldError={errors.name}
                    />

                    <FormChipSelect
                        name="genre"
                        label="Genre"
                        control={control}
                        options={[...GENRES]}
                        fieldError={errors.genre}
                    />

                    <FormChipSelect
                        name="tone"
                        label="Tone"
                        control={control}
                        options={[...toSelectOptions(TONE)]}
                        fieldError={errors.tone}
                        tooltip="This field will apply to any content created in this campaign" // ToDo: Update 
                    />

                    <FormTextField
                        label="Campaign Description"
                        registration={register("description")}
                        fieldError={errors.description}
                        multiline
                        rows={4}
                    />  

                    <FormTextField
                        label="Campaign Rules"
                        registration={register("rules")}
                        fieldError={errors.rules}
                        multiline
                        rows={4}
                    />

                    <FormChipInput
                        name="links"
                        label="External Link(s)"
                        control={control}
                    />

                    <FormRoleAssignmentInput
                        name="players"
                        label="Campaign Players"
                        control={control}
                        roles={roles}
                        itemLabel="Player"
                        tooltip="Press Enter to add players and toggle their roles."
                    />

                    <FormActions mode={mode} entityName="Campaign" isSubmitting={isSubmitting} onCancel={handleCancel} />
                </Box>
            </Paper>
        </>
    )
}