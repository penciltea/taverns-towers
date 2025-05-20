import { FormTextField } from "@/components/Form";
import { useFormContext } from "react-hook-form";

export default function MiscellaneousFields(){
    const {
        register,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormTextField
                name="use"
                label="Use"
                registration={register("use")}
                fieldError={errors.use}
            />

            <FormTextField
                name="features"
                label="Features"
                multiline
                rows={4}
                registration={register("features")}
                fieldError={errors.features}
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