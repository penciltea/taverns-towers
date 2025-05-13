'use client'

import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Paper, Typography, Stack, Box, Button } from "@mui/material";
import { SightFormData } from "@/schemas/sight.schema";
import { FormTextField, FormSelect } from "@/components/Form";
import { LOCATION_CATEGORIES, LOCATION_SIZE, LOCATION_CONDITION } from "@/constants/sightOptions";
import { sightFormFieldsByType } from "@/components/Sight/Form/FieldsByType";
import FormImageUpload from "@/components/Form/FormImageUpload";
import FormActions from "@/components/Form/FormActions";
import { useUIStore } from "@/store/uiStore";
import { useSightContentStore } from "@/store/sightStore";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import CasinoIcon from "@mui/icons-material/Casino";

type SightFormProps = {
  onSubmit: (data: SightFormData) => void;
  mode: "add" | "edit" | null;
};

export default function SightForm({ onSubmit, mode }: SightFormProps){
    const searchParams = useSearchParams();
    const methods = useFormContext<SightFormData>();
    const { handleSubmit, register, control, formState: { errors } } = methods;
    const { selectedItem } = useSightContentStore();
    const { isSubmitting } = useUIStore();

    const typeParam = mode === 'edit'
    ? selectedItem?.type
    : (searchParams?.get("type") as SightFormData["type"]);

    const SpecificFieldsComponent = typeParam && sightFormFieldsByType[typeParam];

    const typeLabel = typeParam
    ? getLabelFromValue(LOCATION_CATEGORIES, typeParam, "Unknown")
    : "Unknown";

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }} >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" gutterBottom>
                    {mode === 'edit' ? `Edit ${selectedItem?.name}` : `Create Sight (${typeLabel})`}
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                            <Button variant="text" startIcon={<CasinoIcon />}>
                                Generate All Fields
                            </Button>
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <FormTextField
                                name="name"
                                label="Sight Name"
                                registration={register("name")}
                                fieldError={errors.name}
                                required
                            />
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{ mt: 2, py: 1.65 }} // align with text field's margin
                            >
                                Generate
                            </Button>
                        </Stack>

                        <FormSelect
                            name="size"
                            label="Size Category"
                            control={control}
                            options={LOCATION_SIZE}
                            fieldError={errors.size}
                        />

                        <FormSelect
                            name="condition"
                            label="Condition"
                            control={control}
                            options={LOCATION_CONDITION}
                            fieldError={errors.condition}
                        />

                        {SpecificFieldsComponent ? (
                            <SpecificFieldsComponent />
                        ) : (
                            <Typography variant="body2">
                                {typeParam ? `Unknown sight type: ${typeParam}` : "No sight type selected."}
                            </Typography>
                        )}
                        
                    </Box>
                    
                    {typeParam && (
                        <Box sx={{paddingTop: 4}}>
                            <FormImageUpload name="image" label="Upload Sight Image" />
                        </Box>
                    )}
                </Stack>

                <FormActions isSubmitting={isSubmitting} mode={mode} entityName="Sight" />
            </Box>
        </Paper>
    )
};