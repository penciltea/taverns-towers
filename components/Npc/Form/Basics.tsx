'use client';

import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormImageUpload from "@/components/Form/FormImageUpload";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { NPC_AGE, NPC_ALIGNMENT, NPC_PRONOUNS, NPC_RACES, NPC_STATUS, NPC_TRAITS } from "@/constants/npc.options";
import { Npc } from "@/interfaces/npc.interface";

export default function NpcFormBasics(){
    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<Npc>();

    const handleGenerateName = async () => {
        const race = watch("race"); // string | undefined
        const { generateNpcName } = await import('@/lib/actions/npcGenerator.actions');
        const generatedName = await generateNpcName({ 
            race: race ? [race] : undefined
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
                    label="NPC Name"
                    required
                    registration={register("name")}
                    fieldError={errors.name}
                    onGenerate={handleGenerateName}
                />       
                
                <FormSelect
                    name="pronouns"
                    label="Pronouns"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(NPC_PRONOUNS)]}
                    fieldError={errors.pronouns}
                    tooltip="This field is purely descriptive."
                />
                
                <FormSelect
                    name="age"
                    label="Age"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(NPC_AGE)]}
                    fieldError={errors.age}
                    tooltip="This field is purely descriptive."
                />
                
                <FormSelect
                    name="race"
                    label="Race"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_RACES]}
                    fieldError={errors.race}
                    tooltip="This field influences name generation."
                />

                <FormSelect
                    name="alignment"
                    label="Alignment"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(NPC_ALIGNMENT)]}
                    fieldError={errors.alignment}
                    tooltip="This field is purely descriptive."
                />

                <FormChipSelect
                    name="traits"
                    label="Traits"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_TRAITS]}
                    fieldError={errors.traits}
                    tooltip="This field is purely descriptive."
                />

                <FormSelect
                    name="status"
                    label="Status"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(NPC_STATUS)]}
                    fieldError={errors.status}
                    tooltip="This field is purely descriptive."
                />

                <FormTextField
                    label="Description"
                    multiline
                    rows={4}
                    registration={register("description")}
                    fieldError={errors.description}
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


            </Box>
            <Box sx={{paddingTop: 4}}>
                <FormImageUpload name="image" label="Upload NPC Image" />
            </Box>
        </Stack>
    );
};