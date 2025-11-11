import { FormSelect, FormTextField } from "@/components/Form";
import { FormChipSelect } from "@/components/Form";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { DEFENSE, KNOWN_TO, PURPOSE, SECRECY_LEVELS } from "@/constants/site/hidden.options";
import { FieldError, useFormContext } from "react-hook-form";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { userTier } from "@/constants/user.options";
import { handleSiteThemesByTier } from "@/lib/util/getMembershipTierForFields";
import { useAuthStore } from "@/store/authStore";

export default function HiddenFields({generator}: SiteFormFieldProps){
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
                tooltip="This field influences the following fields: secrecy levels, defenses."
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences the secrecy level field."
            />
            <FormChipSelect
                name="secrecy"
                label="Secrecy Level"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SECRECY_LEVELS]}
                fieldError={errors.secrecy}
                tooltip="This field influences the following fields: known to, defenses, purpose."
            />
            
            <FormChipSelect
                name="knownTo"
                label="Known To"
                control={control}
                options={[{ label: "Random", value: "random" }, ...KNOWN_TO]}
                fieldError={errors.knownTo}
                tooltip="This field is purely descriptive."
            />

            <FormChipSelect
                name="defenses"
                label="Defense(s)"
                control={control}
                options={[{ label: "Random", value: "random" }, ...DEFENSE]}
                fieldError={errors.defenses}
                tooltip="This field is purely descriptive."
            />

            <FormChipSelect
                name="purpose"
                label="Purpose(s)"
                control={control}
                options={[{ label: "Random", value: "random" }, ...PURPOSE]}
                fieldError={errors.purpose}
                tooltip="This field influences the known to field."
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