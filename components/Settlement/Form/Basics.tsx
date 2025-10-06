import { FieldError, useFormContext } from "react-hook-form";
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MAGIC_LEVELS, SIZE_TYPES } from "@/constants/settlement.options";
import { CLIMATE_TYPES, TERRAIN_TYPES, TAG_TYPES } from "@/constants/environment.options";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormImageUpload from "@/components/Form/FormImageUpload";
import { generateSettlementName } from "@/lib/actions/settlementGenerator.actions";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { TONE } from "@/constants/common.options";

export default function SettlementFormBasics(){
    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const handleGenerateName = async () => {
        const terrain = watch("terrain");
        const tags = watch("tags");
        const climate = watch("climate");
        const magic = watch("magic");
        const wealth = watch("wealth");
        const size = watch("size");
        const generatedName = await generateSettlementName({
            climate: climate,
            terrain: Array.isArray(terrain) ? terrain : [terrain],
            tags: Array.isArray(tags) ? tags : [tags],
            magic: magic,
            wealth: wealth,
            size: size
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
                
                <FormSelect
                    name="size"
                    label="Size Category"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(SIZE_TYPES)]}
                    fieldError={errors.size as FieldError | undefined}
                />

                <FormChipSelect
                    name="tags"
                    label="Tags"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(TAG_TYPES)]}
                    fieldError={errors.tags}
                />

                <FormChipSelect
                    name="tone"
                    label="Tone"
                    control={control}
                    options={[{ label: "Random", value: "random" }, ...toSelectOptions(TONE)]}
                    fieldError={errors.tone}
                />

                <Accordion slotProps={{ heading: { component: 'h2' } }}>
                    <AccordionSummary id="extra-details" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />} sx={{mt: 2}}>
                        <Typography variant="h6" component="h2">Extra Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    <FormChipSelect
                        name="terrain"
                        label="Terrain Type"
                        control={control}
                        options={[{ label: "Random", value: "random" }, ...toSelectOptions(TERRAIN_TYPES)]}
                        fieldError={errors.terrain}
                    />

                    <FormSelect
                        name="climate"
                        label="Climate"
                        control={control}
                        options={[{ label: "Random", value: "random" }, ...toSelectOptions(CLIMATE_TYPES)]}
                        fieldError={errors.climate as FieldError | undefined}
                    />

                    <FormSelect
                        name="magic"
                        label="Magic Level / Use"
                        control={control}
                        options={[{ label: "Random", value: "random" }, ...toSelectOptions(MAGIC_LEVELS)]}
                        fieldError={errors.magic as FieldError | undefined}
                    />

                    <FormTextField
                        label="Common Races"
                        registration={register("races")}
                        fieldError={errors.races}
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
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box sx={{paddingTop: 4}}>
                <FormImageUpload name="map" label="Upload Settlement Map" />
            </Box>
        </Stack>
    );
};