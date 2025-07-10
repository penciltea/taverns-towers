import { FormTextField } from "@/components/Form";
import { FormSelect } from "@/components/Form";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { useFormContext } from "react-hook-form";

export default function ResidenceFields({generator}: SiteFormFieldProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormFieldWithGenerate
                name="name"
                label="Site Name"
                required
                registration={register("name")}
                fieldError={errors.name}
                onGenerate={generator?.name}
            />
            
            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_SIZE]}
                fieldError={errors.size}
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
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