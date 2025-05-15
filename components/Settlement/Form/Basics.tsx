import { useFormContext } from "react-hook-form";
import { Box, Button, Typography, Accordion, AccordionDetails, AccordionSummary, Stack } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CLIMATE_TYPES, MAGIC_LEVELS, SIZE_TYPES, TAG_TYPES, TERRAIN_TYPES } from "@/constants/settlementOptions";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormImageUpload from "@/components/Form/FormImageUpload";
import { generateSettlementName } from "@/lib/actions/settlementGenerator.actions";

export default function SettlementFormBasics(){
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
        const terrain = watch("terrain");
        const tags = watch("tags");
        const generatedName = await generateSettlementName({
            terrain: Array.isArray(terrain) ? terrain : [terrain],
            tags: Array.isArray(tags) ? tags : [tags],
        });
        setValue("name", generatedName, { shouldValidate: true });
    };

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Box>                
                <Stack direction="row" spacing={1} alignItems="flex-start">
                    <FormTextField
                        name="name"
                        label="Settlement Name"
                        registration={register("name")}
                        fieldError={errors.name}
                        required
                    />
                    <Button
                        variant="outlined"
                        onClick={handleGenerateName}
                        size="large"
                        sx={{ mt: 2, py: 1.65 }} // align with text field's margin
                    >
                        Generate
                    </Button>
                </Stack>
                
                <FormSelect
                    name="size"
                    label="Size Category"
                    control={control}
                    options={toSelectOptions(SIZE_TYPES)}
                    fieldError={errors.size}
                />

                <FormChipSelect
                    name="tags"
                    label="Tags"
                    control={control}
                    options={toSelectOptions(TAG_TYPES)}
                    fieldError={errors.tags}
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
                        options={toSelectOptions(TERRAIN_TYPES)}
                        fieldError={errors.terrain}
                    />

                    <FormSelect
                        name="climate"
                        label="Climate"
                        control={control}
                        options={toSelectOptions(CLIMATE_TYPES)}
                        fieldError={errors.climate}
                    />

                    <FormSelect
                        name="magic"
                        label="Magic Level / Use"
                        control={control}
                        options={toSelectOptions(MAGIC_LEVELS)}
                        fieldError={errors.magic}
                    />

                    <FormTextField
                        name="races"
                        label="Common Races"
                        registration={register("races")}
                        fieldError={errors.races}
                    />

                    <FormTextField
                        name="publicNotes"
                        label="Public Notes"
                        multiline
                        rows={4}
                        registration={register("publicNotes")}
                        fieldError={errors.publicNotes}
                    />

                    <FormTextField
                        name="gmNotes"
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