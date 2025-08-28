import { useFormContext } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormImageUpload from "@/components/Form/FormImageUpload";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { NPC_AGE, NPC_ALIGNMENT, NPC_PRONOUNS, NPC_RACES, NPC_STATUS, NPC_TRAITS } from "@/constants/npc.options";
import { generateNpcName } from "@/lib/actions/npcGenerator.actions";

export default function NpcFormBasics(){
    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const mapValue = watch("map");
    const isBrowser = typeof window !== "undefined";

    typeof mapValue === "string"
        ? mapValue // existing URL from DB
        : isBrowser && mapValue instanceof FileList && mapValue[0]
        ? URL.createObjectURL(mapValue[0])
        : null;

    const handleGenerateName = async () => {
        const race = watch("race");
        const generatedName = await generateNpcName({race: race});
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
                />
                
                <FormSelect
                    name="age"
                    label="Age"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(NPC_AGE)]}
                    fieldError={errors.age}
                />
                
                <FormSelect
                    name="race"
                    label="Race"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_RACES]}
                    fieldError={errors.race}
                />

                <FormSelect
                    name="alignment"
                    label="Alignment"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(NPC_ALIGNMENT)]}
                    fieldError={errors.alignment}
                />

                <FormChipSelect
                    name="traits"
                    label="Traits"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...NPC_TRAITS]}
                    fieldError={errors.tags}
                />

                <FormSelect
                    name="status"
                    label="Status"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(NPC_STATUS)]}
                    fieldError={errors.status}
                />

                <FormTextField
                    label="Description"
                    multiline
                    rows={4}
                    registration={register("description")}
                    fieldError={errors.description}
                />

                <FormTextField
                    label="Public Notes"
                    multiline
                    rows={4}
                    registration={register("publicNotes")}
                    fieldError={errors.publicNotes}
                />

                <FormTextField
                    label="GM Notes"
                    multiline
                    rows={4}
                    registration={register("gmNotes")}
                    fieldError={errors.gmNotes}
                />


            </Box>
            <Box sx={{paddingTop: 4}}>
                <FormImageUpload name="image" label="Upload NPC Image" />
            </Box>
        </Stack>
    );
};