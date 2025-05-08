import { FormTextField } from "@/components/Form";
import { FormSelect } from "@/components/Form";
import { WEALTH_LEVELS } from "@/constants/sightOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { useFormContext } from "react-hook-form";

export default function ResidenceFields(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
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