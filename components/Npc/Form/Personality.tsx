'use client';

import { FieldError, useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import { NPC_PERSUASION, NPC_REPUTATION, NPC_TRAITS } from "@/constants/npc.options";
import { Npc } from "@/interfaces/npc.interface";

export default function NpcFormPersonality(){
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<Npc>();

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Box sx={{ flexGrow: 1 }}>                
                <FormChipSelect
                    name="traits"
                    label="Traits"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_TRAITS]}
                    fieldError={errors.traits}
                    tooltip="This field influences the persuaded by field."
                />

                <FormSelect
                    name="reputation"
                    label="Reputation"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_REPUTATION]}
                    fieldError={errors.reputation as FieldError | undefined}
                    tooltip="This field is purely descriptive." // ToDo: Verify
                />
                                

                <FormChipSelect
                    name="persuasion"
                    label="Persuased by"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_PERSUASION]}
                    fieldError={errors.alignment}
                    tooltip="This field is purely descriptive." // ToDo: Verify
                />

                <FormTextField
                    label="Likes"
                    registration={register("likes")}
                    fieldError={errors.likes}
                    tooltip="This field is purely descriptive."
                />

                <FormTextField
                    label="Dislikes"
                    registration={register("dislikes")}
                    fieldError={errors.dislikes}
                    tooltip="This field is purely descriptive."
                />
            </Box>
        </Stack>
    );
};