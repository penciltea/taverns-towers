'use client'

import { useState, useEffect } from "react";
import { useCampaignAccess } from "@/hooks/campaign/useCampaignAccess";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { getAvailableOptions } from "@/lib/util/getAvailableOptions";
import { useAuthStore } from "@/store/authStore";
import { useCampaignStore } from "@/store/campaignStore";
import { FieldError, useFormContext } from "react-hook-form";
import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { ARTISAN_SITE_THEMES, SITE_CONDITION, SITE_SIZE, SITE_THEMES } from "@/constants/site/site.options";

export default function MiscellaneousFields({generator}: SiteFormFieldProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { user } = useAuthStore();

    const { playerHasContentPermissions } = useCampaignAccess();
    const selectedCampaign = useCampaignStore(state => state.selectedCampaign);

    const [themes, setThemes] = useState(SITE_THEMES);

    useEffect(() => {
        async function loadThemes() {
            if (!user) return;

            const available = await getAvailableOptions({
                freeOptions: SITE_THEMES,
                premiumOptions: [...ARTISAN_SITE_THEMES, ...SITE_THEMES],
                userTier: user?.tier,
                selectedCampaign,
                playerHasContentPermissions,
            });

            setThemes(available);
        }

        loadThemes();
    }, [user?.tier, selectedCampaign?._id, selectedCampaign, user, playerHasContentPermissions]);
    
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
                options={themes}
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