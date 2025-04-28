'use client'

import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Paper, Typography, Stack, Box } from "@mui/material";
import { LocationFormData } from "@/schemas/locationSchema";
import { FormTextField, FormSelect } from "@/components/Form";
import { LOCATION_CATEGORIES, LOCATION_SIZE, LOCATION_CONDITION } from "@/constants/locationOptions";
import { locationFormFieldsByType } from "@/components/Location/Form/FieldsByType";
import FormImageUpload from "@/components/Form/FormImageUpload";
import FormActions from "@/components/Form/FormActions";
import { useLocationContentStore } from "@/store/locationStore";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";

type LocationFormProps = {
  onSubmit: (data: LocationFormData) => void;
  mode: "add" | "edit" | null;
};

export default function LocationForm({ onSubmit, mode }: LocationFormProps){
    const searchParams = useSearchParams();
    const methods = useFormContext<LocationFormData>();
    const { handleSubmit, register, control, formState: { errors } } = methods;
    const { selectedItem } = useLocationContentStore();

    const typeParam = mode === 'edit'
    ? selectedItem?.type
    : (searchParams?.get("type") as LocationFormData["type"]);

    const SpecificFieldsComponent = typeParam && locationFormFieldsByType[typeParam];

    const typeLabel = typeParam
    ? getLabelFromValue(LOCATION_CATEGORIES, typeParam, "Unknown")
    : "Unknown";

    return (
        <Paper
            elevation={3}
            sx={{
            p: 3,
            mb: 4,
            borderRadius: 2
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" gutterBottom>
                    {mode === 'edit' ? `Edit ${selectedItem?.name}` : `Create Location (${typeLabel})`}
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <Box>
                        <FormTextField
                            name="name"
                            label="Location Name"
                            registration={register("name")}
                            fieldError={errors.name}
                            required
                        />

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
                                {typeParam ? `Unknown location type: ${typeParam}` : "No location type selected."}
                            </Typography>
                        )}
                        
                    </Box>
                    
                    {typeParam && (
                        <Box>
                            <FormImageUpload name="image" label="Upload Location Image" />
                        </Box>
                    )}
                </Stack>

                <FormActions mode={mode} entityName="Location" />
            </form>
        </Paper>
    )
};