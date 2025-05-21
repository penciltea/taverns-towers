import { FormSelect, FormTextField } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { SECURITY_LEVELS, SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import { Stack, Button } from "@mui/material";

type GovernmentFormProps = {
    handleGenerateName: () => void;
    handleGenerateMenu: () => void;
}

export default function GovernmentFields({handleGenerateName}: GovernmentFormProps){
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
                name="function"
                label="Function"
                registration={register("function")}
                fieldError={errors.function}
            />

            <FormTextField
                name="officials"
                label="Official(s)"
                registration={register("officials")}
                fieldError={errors.officials}
            />

            <FormTextField
                name="jurisdiction"
                label="Jurisdiction"
                registration={register("jurisdiction")}
                fieldError={errors.jurisdiction}
            />

            <FormSelect
                name="security"
                label="Security Level"
                control={control}
                options={SECURITY_LEVELS}
                fieldError={errors.security}
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