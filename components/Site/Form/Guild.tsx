'use client';

import { useEffect, useState } from "react";
import { useCampaignStore } from "@/store/campaignStore";
import { useCampaignAccess } from "@/hooks/campaign/useCampaignAccess";
import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import { ARTISAN_SITE_THEMES, SITE_CONDITION, SITE_SIZE, SITE_THEMES } from "@/constants/site/site.options";
import { GUILD_MEMBERSHIP_REQUIREMENTS, GUILD_TYPES } from "@/constants/site/guild.options";
import { Box } from "@mui/material";
import { FieldError, useFormContext } from "react-hook-form";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import FormEditableCard from "@/components/Form/FormEditableCard";
import { useAuthStore } from "@/store/authStore";
import { getAvailableOptions } from "@/lib/util/getAvailableOptions";


export default function GuildFields({generator}: SiteFormFieldProps){
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
    }, [user?.tier, selectedCampaign?._id]);
  
    return (
        <>
            <FormSelect
                name="guildType"
                label="Guild Type"
                required
                control={control}
                options={[{ label: "Random", value: "random" }, ...GUILD_TYPES]}
                fieldError={errors.guildTypes as FieldError | undefined}
                tooltip="This field influences the following fields: name, membership type, services item generation."
            />

            <FormFieldWithGenerate
                name="guildName"
                label="Guild Name"
                registration={register("guildName")}
                fieldError={errors.guildName}
                required                
                onGenerate={() => generator?.name?.("guildName")}
            />

            <FormFieldWithGenerate
                name="name"
                label="Site Name"
                registration={register("name")}
                fieldError={errors.name}
                required                
                onGenerate={() => generator?.name?.("name")}
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
                tooltip="This field influences services item generation."
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences services item generation."
            />

            <FormChipSelect
                name="membershipRequirements"
                label="Membership Requirements"
                control={control}
                options={[
                    {
                        label: "Random",
                        options: [{ label: "Random", value: "random" }],
                    },
                    ...GUILD_MEMBERSHIP_REQUIREMENTS
                ]}
                fieldError={errors.membershipRequirements}
                tooltip="This field is purely descriptive."
            />

            <FormTextField
                label="Known Rivals"
                registration={register("knownRivals")}
                fieldError={errors.knownRivals}
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
                    siteType="guild"
                    onGenerateItems={(index?: number) => generator?.menuItems?.(index)}
                    buttonLabel="Conjure services"
                    menuWarning="Please select a guild type to access the Services table"
                />
            </Box>
        </>
    )
}