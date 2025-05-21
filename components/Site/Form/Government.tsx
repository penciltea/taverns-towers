import { FormSelect, FormTextField } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { SECURITY_LEVELS, SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";

export default function GovernmentFields({generator}: SiteFormFieldProps){
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
                options={[{ label: "Random", value: "random" }, ...SECURITY_LEVELS]}
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