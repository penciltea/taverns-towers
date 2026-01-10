'use client'

import { FieldError, useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { NPC_BUILD, NPC_DISTINGUISHING_FEATURES, NPC_EYE_COLOR, NPC_HAIR_COLOR, NPC_HAIR_STYLE, NPC_HEIGHT, NPC_SKINTONE } from "@/constants/npc.options";
import { Npc } from "@/interfaces/npc.interface";

export default function NpcFormPhysicalTraits(){
    const {
        control,
        formState: { errors },
    } = useFormContext<Npc>();

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Box sx={{ flexGrow: 1}}>
                <FormSelect
                    name="height"
                    label="Height"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_HEIGHT]}
                    fieldError={errors.height as FieldError | undefined}
                    tooltip="This field is purely descriptive."
                />

                <FormSelect
                    name="build"
                    label="Build"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_BUILD]}
                    fieldError={errors.build as FieldError | undefined}
                    tooltip="This field is purely descriptive."
                />

                <FormChipSelect
                    name="skinTone"
                    label="Skin Tone"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_SKINTONE]}
                    fieldError={errors.skinTone}
                    tooltip="This field is purely descriptive."
                />

                <FormChipSelect
                    name="hairColor"
                    label="Hair Color"
                    control={control}
                    options={[{ label: "Random", value: "random" }, { label: "None", value: "none" }, ...NPC_HAIR_COLOR]}
                    fieldError={errors.hairColor}
                    tooltip="This field is purely descriptive."
                />

                <FormChipSelect
                    name="hairStyle"
                    label="Hair Style"
                    control={control}
                    options={[{ label: "Random", value: "random" }, { label: "None", value: "none" }, ...NPC_HAIR_STYLE]}
                    fieldError={errors.hairStyle}
                    tooltip="This field is purely descriptive."
                />

                <FormChipSelect
                    name="eyeColor"
                    label="Eye Color"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_EYE_COLOR]}
                    fieldError={errors.eyeColor}
                    tooltip="This field is purely descriptive."
                />

                <FormChipSelect
                    name="features"
                    label="Distinguishing Features"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_DISTINGUISHING_FEATURES]}
                    fieldError={errors.features}
                    tooltip="This field is purely descriptive."
                />

            </Box>
        </Stack>
    )
}