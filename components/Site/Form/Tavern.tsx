'use client'

import { useState, useEffect } from "react";
import { useCampaignStore } from "@/store/campaignStore";
import { useAuthStore } from "@/store/authStore";
import { useCampaignAccess } from "@/hooks/campaign/useCampaignAccess";
import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import { SITE_SIZE, SITE_CONDITION, TAVERN_ENTERTAINMENT_OFFERINGS, ARTISAN_SITE_THEMES, SITE_THEMES } from "@/constants/site/site.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import Box from "@mui/material/Box";
import { FieldError, useFormContext } from "react-hook-form";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormEditableCard from "@/components/Form/FormEditableCard";
import { getAvailableOptions } from "@/lib/util/getAvailableOptions";


export default function TavernFields({generator}: SiteFormFieldProps){
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
        <Box sx={{ flexGrow: 1 }}>
            <FormFieldWithGenerate
                name="name"
                label="Tavern Name"
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
                tooltip="This field influences the following fields: clientele, entertainment offerings, room cost, menu item generation."
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences the following fields: clientele, entertainment offerings, room cost, menu item generation."
            />
            
            <FormTextField
                label="Clientele"
                registration={register("clientele")}
                fieldError={errors.clientele}
                tooltip="This field is purely descriptive."
            />

            <FormChipSelect
                name="entertainment"
                label="Entertainment Offerings"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(TAVERN_ENTERTAINMENT_OFFERINGS)]}
                fieldError={errors.entertainment}
                tooltip="This field is purely descriptive."
            />

            <FormTextField
                label="Room Cost per Night"
                registration={register("cost")}
                fieldError={errors.cost}
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
                    header="Tavern Menu"
                    siteType="tavern"
                    onGenerateItems={(index?: number) => generator?.menuItems?.(index)}
                    buttonLabel="Conjure full menu"
                />
            </Box>
        </Box>
    )
}