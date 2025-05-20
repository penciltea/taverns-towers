import { FormTextField } from "@/components/Form";
import { FormChipSelect } from "@/components/Form";
import { SECRECY_LEVELS } from "@/constants/siteOptions";
import { useFormContext } from "react-hook-form";

export default function HiddenFields(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormChipSelect
                name="secrecy"
                label="Secrecy Level"
                control={control}
                options={SECRECY_LEVELS}
                fieldError={errors.secrecy}
            />

            <FormTextField
                name="leader"
                label="Leader(s)"
                registration={register("leader")}
                fieldError={errors.leader}
            />            
            
            <FormTextField
                name="knownTo"
                label="Known To"
                registration={register("knownTo")}
                fieldError={errors.knownTo}
            />

            <FormTextField
                name="defenses"
                label="Defense(s)"
                registration={register("defenses")}
                fieldError={errors.defenses}
            />

            <FormTextField
                name="purpose"
                label="Purpose"
                registration={register("purpose")}
                fieldError={errors.purpose}
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