import { FormSelect, FormTextField } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { GOVERNMENT_FUNCTIONS, SECURITY_LEVELS } from "@/constants/site/government.options";
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

            <FormSelect
                name="function"
                label="Function"
                control={control}
                options={[
                    { label: "Random", value: "random" },
                    ...GOVERNMENT_FUNCTIONS,
                ]}
                fieldError={errors.function}
            />

            <FormSelect
                name="security"
                label="Security Level"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SECURITY_LEVELS]}
                fieldError={errors.security}
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