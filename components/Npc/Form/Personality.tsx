'use client';

import { FieldError, useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FormSelect, FormChipSelect } from "@/components/Form";
import FormImageUpload from "@/components/Form/FormImageUpload";
import { NPC_PERSUASION, NPC_REPUTATION, NPC_ARCHETYPE, NPC_OCCUPATION } from "@/constants/npc.options";
import { Npc } from "@/interfaces/npc.interface";

export default function NpcFormPersonality(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<Npc>();

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Box>         
                <FormSelect
                    name="reputation"
                    label="Reputation"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_REPUTATION]}
                    fieldError={errors.reputation as FieldError | undefined}
                    tooltip="This field is purely descriptive." // ToDo: Verify
                />
                
                <FormSelect
                    name="archetype"
                    label="Archetype"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_ARCHETYPE]}
                    fieldError={errors.archetype as FieldError | undefined}
                    tooltip="This field is purely descriptive." // ToDo: Verify
                />
                
                <FormChipSelect
                    name="occupation"
                    label="Occupation"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_OCCUPATION]}
                    fieldError={errors.occupation}
                    tooltip="This field influences name generation." // ToDo: Verify
                />

                <FormChipSelect
                    name="persuasion"
                    label="Persuasion Tactics"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_PERSUASION]}
                    fieldError={errors.alignment}
                    tooltip="This field is purely descriptive."
                />

            </Box>
            <Box sx={{paddingTop: 4}}>
                <FormImageUpload name="image" label="Upload NPC Image" />
            </Box>
        </Stack>
    );
};