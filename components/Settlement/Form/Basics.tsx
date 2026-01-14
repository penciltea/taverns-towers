'use client'

import { useEffect, useState } from "react";
import { useCampaignStore } from "@/store/campaignStore";
import { useCampaignAccess } from "@/hooks/campaign/useCampaignAccess";
import { FieldError, useFormContext } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import { MAGIC_LEVELS, SIZE_TYPES } from "@/constants/settlement.options";
import { CLIMATE_TYPES, TERRAIN_TYPES, TAG_TYPES } from "@/constants/environment.options";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormImageUpload from "@/components/Form/FormImageUpload";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { TONE } from "@/constants/common.options";
import { THEME, ARTISAN_THEMES } from '@/constants/settlement.options';
import { useAuthStore } from "@/store/authStore";
import { userTier } from "@/constants/user.options";

export default function SettlementFormBasics(){
    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const { user } = useAuthStore();

    const { playerHasContentPermissions } = useCampaignAccess();
    const selectedCampaign = useCampaignStore(state => state.selectedCampaign);

    const [themes, setThemes] = useState(THEME);

    useEffect(() => {
        let isMounted = true;

        async function loadThemes() {
            if (!user || !selectedCampaign?._id) return;

            const hasPermissions = await playerHasContentPermissions(selectedCampaign._id);
            if (!isMounted) return;

            if (hasPermissions || user.tier === "Artisan" || user.tier === "Architect") {
                setThemes([...ARTISAN_THEMES, ...THEME]);
            } else {
                setThemes(THEME);
            }
        }

        loadThemes();

        return () => {
            isMounted = false;
        };
    }, [user, selectedCampaign?._id, playerHasContentPermissions]);

    const rawTheme = watch("theme");

    const theme =
    Array.isArray(rawTheme) && rawTheme.length > 0
        ? rawTheme.filter(Boolean)
        : rawTheme
        ? [rawTheme]
        : ["Medieval Fantasy"];
    
    const handleGenerateName = async () => {
        const terrain = watch("terrain");
        const tags = watch("tags");
        const climate = watch("climate");
        const magic = watch("magic");
        const wealth = watch("wealth");
        const size = watch("size");
        const theme = watch("theme");
        const { generateSettlementName } = await import('@/lib/actions/settlementGenerator.actions');
        const generatedName = await generateSettlementName({
            climate: climate,
            terrain: Array.isArray(terrain) ? terrain : [terrain],
            tags: Array.isArray(tags) ? tags : [tags],
            magic: magic,
            wealth: wealth,
            size: size,
            theme,
            tier: user?.tier ?? userTier[0]
        });
        setValue("name", generatedName, { shouldValidate: true });
    };

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Box>         
                <FormFieldWithGenerate
                    name="name"
                    label="Settlement Name"
                    required
                    registration={register("name")}
                    fieldError={errors.name}
                    onGenerate={handleGenerateName}
                />       

                <FormChipSelect
                    name="theme"
                    label="Theme"
                    control={control}
                    options={themes}
                    fieldError={errors.theme}
                    tooltip="This field influences name generation."
                />


                <FormChipSelect
                    name="tone"
                    label="Tone"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(TONE)]}
                    fieldError={errors.tone}
                    tooltip="This field is currently not influencing other fields just yet, but will soon!" // ToDo: Update 
                />
                
                <FormSelect
                    name="size"
                    label="Size Category"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(SIZE_TYPES)]}
                    fieldError={errors.size as FieldError | undefined}
                    tooltip="Influences the following fields: name, ruling style, wealth levels, military presence, common races, and potential site fields."
                />

                <FormSelect
                    name="climate"
                    label="Climate"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(CLIMATE_TYPES)]}
                    fieldError={errors.climate as FieldError | undefined}
                    tooltip="Influences the following fields: name, terrain, tags, common races, trade notes, holidays, folklore & superstitions, commonly-worshipped domains, and potential site fields."
                />

                <FormChipSelect
                    name="terrain"
                    label="Terrain Type"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(TERRAIN_TYPES)]}
                    fieldError={errors.terrain}
                    tooltip="Influences the following fields: name, tags, common races, trade notes, holidays, folklore & superstitions, commonly-worshipped domains, and potential site fields."
                />                

                <FormChipSelect
                    name="tags"
                    label="Tags"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(TAG_TYPES)]}
                    fieldError={errors.tags}
                    tooltip="Influences the following fields: name, common races, trade notes, holidays, folklore & superstitions, commonly-worshipped domains, and potential site fields."
                />

                <FormSelect
                    name="magic"
                    label="Magic Level / Use"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(MAGIC_LEVELS)]}
                    fieldError={errors.magic as FieldError | undefined}
                    tooltip="Influences the following fields: name, common races, military presence, holidays, folklore & superstitions, and potential site fields."
                />

                <FormTextField
                    label="Common Races"
                    registration={register("races")}
                    fieldError={errors.races}
                    tooltip="This field is purely descriptive and doesn't influence other fields."
                />     

                <FormTextField
                    label="Description"
                    multiline
                    rows={4}
                    registration={register("description")}
                    fieldError={errors.description}
                    tooltip="This field is purely descriptive and doesn't influence other fields."
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
            </Box>
            <Box sx={{paddingTop: 4}}>
                <FormImageUpload name="map" label="Upload Settlement Map" />
            </Box>
        </Stack>
    );
};