import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SECURITY_LEVELS } from "@/constants/sightOptions";

export default function GovernmentFields(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
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