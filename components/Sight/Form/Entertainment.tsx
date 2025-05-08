import { FormTextField } from "@/components/Form";
import { useFormContext } from "react-hook-form";

export default function EntertainmentFields(){
    const {
        register,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormTextField
                name="venueType"
                label="Venue Type"
                registration={register("venueType")}
                fieldError={errors.venueType}
            />
            
            <FormTextField
                name="owner"
                label="Owner"
                registration={register("owner")}
                fieldError={errors.owner}
            />
            
            <FormTextField
                name="performances"
                label="Performances"
                registration={register("performances")}
                fieldError={errors.performances}
            />

            <FormTextField
                name="cost"
                label="Cost"
                registration={register("cost")}
                fieldError={errors.cost}
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