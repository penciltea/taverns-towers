import { FormSelect, FormTextField } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { ENTERTAINMENT_VENUE_TYPES } from "@/constants/siteOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";

export default function EntertainmentFields(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormSelect
                name="venueType"
                label="Venue Type"
                control={control}
                options={toSelectOptions(ENTERTAINMENT_VENUE_TYPES)}
                fieldError={errors.shopType}
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