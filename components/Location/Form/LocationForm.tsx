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

type LocationFormProps = {
  onSubmit: (data: LocationFormData) => void;
  mode: "add" | "edit" | null;
};

export default function LocationForm({ onSubmit, mode }: LocationFormProps){
    const searchParams = useSearchParams();
    const methods = useFormContext<LocationFormData>();
    const { handleSubmit } = methods;
    const typeParam = searchParams?.get("type") as LocationFormData["type"];
    const SpecificFieldsComponent = locationFormFieldsByType[typeParam];

    const typeLabel = LOCATION_CATEGORIES.find(c => c.value === typeParam)?.label ?? "Unknown";
    const { selectedItem } = useLocationContentStore();

    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();

    const imageValue = watch("image");
    const isBrowser = typeof window !== "undefined";

    typeof imageValue === "string"
        ? imageValue // existing URL from DB
        : isBrowser && imageValue instanceof FileList && imageValue[0]
        ? URL.createObjectURL(imageValue[0])
        : null;
        
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

                        <FormTextField
                            name="publicNotes"
                            label="Public Notes"
                            registration={register("publicNotes")}
                            fieldError={errors.publicNotes}
                        />

                        <FormTextField
                            name="gmNotes"
                            label="GM Notes"
                            registration={register("gmNotes")}
                            fieldError={errors.gmNotes}
                        />

                        {SpecificFieldsComponent ? (
                            <SpecificFieldsComponent />
                        ) : (
                            <Typography variant="body2">Unknown location type: {typeParam}</Typography>
                        )}
                        
                    </Box>
                    
                    <Box>
                        <FormImageUpload name="image" label="Upload Location Image" />
                    </Box>
                </Stack>

                <FormActions mode={mode} entityName="Location" />
            </form>
        </Paper>
    )
};