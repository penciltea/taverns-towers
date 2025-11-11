import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import FormEditableCard from "@/components/Form/FormEditableCard";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { DOMAINS } from "@/constants/common.options";
import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { userTier } from "@/constants/user.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { handleSiteThemesByTier } from "@/lib/util/getMembershipTierForFields";
import { useAuthStore } from "@/store/authStore";
import { Box } from "@mui/material";
import { FieldError, useFormContext } from "react-hook-form";

export default function TempleFields({generator}: SiteFormFieldProps){
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
                name="domains"
                label="Worshipped Domain(s)"
                required
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(DOMAINS)]}
                fieldError={errors.domains}
                tooltip="This field influences the following fields: relics, services item generation."
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
                tooltip="This field influences the following fields: relics, services item generation."
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences the following fields: relics, services item generation."
            />

            <FormTextField
                label="Relics"
                multiline
                rows={4}
                registration={register("relics")}
                fieldError={errors.relics}
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

            <Box sx={{mt: 4}}>
                <FormEditableCard
                    name="menu"
                    header="Services Offered"
                    siteType="temple"
                    onGenerateItems={(index?: number) => generator?.menuItems?.(index)}
                    buttonLabel="Conjure services"
                />
            </Box>
        </>
    )
}