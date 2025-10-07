import { FormSelect, FormTextField } from "@/components/Form";
import { FormChipSelect } from "@/components/Form";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { DEFENSE, KNOWN_TO, PURPOSE, SECRECY_LEVELS } from "@/constants/site/hidden.options";
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
                tooltip="This field influences the following fields: secrecy levels, defenses"
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences secrecy levels"
            />
            <FormChipSelect
                name="secrecy"
                label="Secrecy Level"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SECRECY_LEVELS]}
                fieldError={errors.secrecy}
                tooltip="This field influences the following fields: known to, defenses, purpose"
            />
            
            <FormChipSelect
                name="knownTo"
                label="Known To"
                control={control}
                options={[{ label: "Random", value: "random" }, ...KNOWN_TO]}
                fieldError={errors.knownTo}
                tooltip="This field is purely descriptive"
            />

            <FormChipSelect
                name="defenses"
                label="Defense(s)"
                control={control}
                options={[{ label: "Random", value: "random" }, ...DEFENSE]}
                fieldError={errors.defenses}
                tooltip="This field is purely descriptive"
            />

            <FormChipSelect
                name="purpose"
                label="Purpose(s)"
                control={control}
                options={[{ label: "Random", value: "random" }, ...PURPOSE]}
                fieldError={errors.purpose}
                tooltip="This field influences the following fields: known to"
            />

            <FormTextField
                label="Public Notes"
                multiline
                rows={4}
                registration={register("publicNotes")}
                fieldError={errors.publicNotes}
                tooltip="This field is purely descriptive"
            />

            <FormTextField
                label="GM Notes"
                multiline
                rows={4}
                registration={register("gmNotes")}
                fieldError={errors.gmNotes}
                tooltip="This field is purely descriptive"
            />
        </>
    )
}