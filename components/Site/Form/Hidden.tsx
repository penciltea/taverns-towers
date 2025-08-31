import { FormSelect, FormTextField } from "@/components/Form";
import { FormChipSelect } from "@/components/Form";
import { SECRECY_LEVELS, SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { FieldError, useFormContext } from "react-hook-form";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";

export default function HiddenFields({generator}: SiteFormFieldProps){
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
                fieldError={errors.size as FieldError | undefined}
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
            />
            <FormChipSelect
                name="secrecy"
                label="Secrecy Level"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SECRECY_LEVELS]}
                fieldError={errors.secrecy}
            />
            
            <FormTextField
                label="Known To"
                registration={register("knownTo")}
                fieldError={errors.knownTo}
            />

            <FormTextField
                label="Defense(s)"
                registration={register("defenses")}
                fieldError={errors.defenses}
            />

            <FormTextField
                label="Purpose"
                registration={register("purpose")}
                fieldError={errors.purpose}
            />

            <FormTextField
                label="Public Notes"
                multiline
                rows={4}
                registration={register("publicNotes")}
                fieldError={errors.publicNotes}
            />

            <FormTextField
                label="GM Notes"
                multiline
                rows={4}
                registration={register("gmNotes")}
                fieldError={errors.gmNotes}
            />
        </>
    )
}