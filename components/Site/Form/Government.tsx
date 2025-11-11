import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import { FieldError, useFormContext } from "react-hook-form";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { GOVERNMENT_FUNCTIONS, SECURITY_LEVELS } from "@/constants/site/government.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { userTier } from "@/constants/user.options";
import { handleSiteThemesByTier } from "@/lib/util/getMembershipTierForFields";
import { useAuthStore } from "@/store/authStore";

export default function GovernmentFields({generator}: SiteFormFieldProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { user } = useAuthStore();
    
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

            <FormChipSelect
                name="siteTheme"
                label="Theme"
                control={control}
                options={handleSiteThemesByTier(user?.tier ?? userTier[0])}
                fieldError={errors.siteTheme}
                tooltip="This field influences name generation."
            />
            
            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_SIZE]}
                fieldError={errors.size as FieldError | undefined}
                tooltip="This field influences security level."
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences security level."
            />

            <FormSelect
                name="function"
                label="Function"
                control={control}
                options={[
                    { label: "Random", value: "random" },
                    ...GOVERNMENT_FUNCTIONS,
                ]}
                fieldError={errors.function as FieldError | undefined}
                tooltip="This field influences the following fields: name, security level."
            />

            <FormSelect
                name="security"
                label="Security Level"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SECURITY_LEVELS]}
                fieldError={errors.security as FieldError | undefined}
                tooltip="This field is purely descriptive."
            />           

            <FormTextField
                label="Public Notes"
                multiline
                rows={4}
                registration={register("publicNotes")}
                fieldError={errors.publicNotes}
                tooltip="This field is purely descriptive and is visible to everyone if this site is shared."
            />

            <FormTextField
                label="GM Notes"
                multiline
                rows={4}
                registration={register("gmNotes")}
                fieldError={errors.gmNotes}
                tooltip="This field is purely descriptive and is only visible to you."
            />
        </>
    )
}