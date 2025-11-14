'use client'

import { useState, useEffect } from "react";
import { useCampaignStore } from "@/store/campaignStore";
import { useAuthStore } from "@/store/authStore";
import { useCampaignAccess } from "@/hooks/campaign/useCampaignAccess";
import { FormSelect, FormTextField } from "@/components/Form";
import { FormChipSelect } from "@/components/Form";
import { ARTISAN_SITE_THEMES, SITE_CONDITION, SITE_SIZE, SITE_THEMES } from "@/constants/site/site.options";
import { DEFENSE, KNOWN_TO, PURPOSE, SECRECY_LEVELS } from "@/constants/site/hidden.options";
import { FieldError, useFormContext } from "react-hook-form";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { getAvailableOptions } from "@/lib/util/getAvailableOptions";


export default function HiddenFields({generator}: SiteFormFieldProps){
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