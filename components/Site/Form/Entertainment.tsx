'use client';

import { useEffect, useState } from "react";
import { useCampaignStore } from "@/store/campaignStore";
import { useCampaignAccess } from "@/hooks/campaign/useCampaignAccess";
import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import { FieldError, useFormContext } from "react-hook-form";
import { ARTISAN_SITE_THEMES, ENTERTAINMENT_VENUE_TYPES, SITE_CONDITION, SITE_SIZE, SITE_THEMES } from "@/constants/site/site.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { useAuthStore } from "@/store/authStore";


export default function EntertainmentFields({generator}: SiteFormFieldProps){
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
        let isMounted = true;

        async function loadThemes() {
            if (!user || !selectedCampaign?._id) return;

            const hasPermissions = await playerHasContentPermissions(selectedCampaign._id);
            if (!isMounted) return;

            if (hasPermissions || user.tier === "Artisan" || user.tier === "Architect") {
                setThemes([...ARTISAN_SITE_THEMES, ...SITE_THEMES]);
            } else {
                setThemes(SITE_THEMES);
            }
        }

        loadThemes();

        return () => {
            isMounted = false;
        };
    }, [user, selectedCampaign?._id, playerHasContentPermissions]);

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
                tooltip="This field influences entry cost calculations."
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences entry cost calculations."
            />
            <FormSelect
                name="venueType"
                label="Venue Type"
                control={control}
                options={[{ label: "Random", value: "random" }, ...ENTERTAINMENT_VENUE_TYPES]}
                fieldError={errors.venueType as FieldError | undefined}
                tooltip="This field influences name generation."
            />

            <FormTextField
                label="Entry / Ticket Cost"
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
        </>
    )
}