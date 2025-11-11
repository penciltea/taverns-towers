import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { userTier } from "@/constants/user.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { handleSiteThemesByTier } from "@/lib/util/getMembershipTierForFields";
import { useAuthStore } from "@/store/authStore";
import { FieldError, useFormContext } from "react-hook-form";

export default function MiscellaneousFields({generator}: SiteFormFieldProps){
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
                tooltip="This field is purely descriptive."
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field is purely descriptive."
            />
            
            <FormTextField
                label="Use"
                registration={register("use")}
                fieldError={errors.use}
                tooltip="This field is purely descriptive."
            />

            <FormTextField
                label="Features"
                multiline
                rows={4}
                registration={register("features")}
                fieldError={errors.features}
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