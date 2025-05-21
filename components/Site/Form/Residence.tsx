import { FormTextField } from "@/components/Form";
import { FormSelect } from "@/components/Form";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import { Stack, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

type ResidenceFormProps = {
    handleGenerateName: () => void;
    handleGenerateMenu: () => void;
}

export default function ResidenceFields({handleGenerateName}: ResidenceFormProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <Stack direction="row" spacing={1} alignItems="flex-start">
                <FormTextField
                    name="name"
                    label="Site Name"
                    registration={register("name")}
                    fieldError={errors.name}
                    required
                />
                    <Button
                    variant="outlined"
                    onClick={handleGenerateName}
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
                options={SITE_SIZE}
                fieldError={errors.size}
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={SITE_CONDITION}
                fieldError={errors.condition}
            />

            <FormTextField
                name="occupant"
                label="Occupant(s)"
                registration={register("occupant")}
                fieldError={errors.occupant}
            />
            
            <FormTextField
                name="notableFeatures"
                label="Notable Features"
                registration={register("notableFeatures")}
                fieldError={errors.notableFeatures}
            />

            <FormTextField
                name="publicNotes"
                label="Public Notes"
                multiline
                rows={4}
                registration={register("publicNotes")}
                fieldError={errors.publicNotes}
            />

            <FormTextField
                name="gmNotes"
                label="GM Notes"
                multiline
                rows={4}
                registration={register("gmNotes")}
                fieldError={errors.gmNotes}
            />
        </>
    )
}