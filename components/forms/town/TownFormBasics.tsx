import { useFormContext } from "react-hook-form";
import { Box, Button, Typography, Accordion, AccordionDetails, AccordionSummary, Stack } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CLIMATE_TYPES, MAGIC_LEVELS, SIZE_TYPES, TAG_TYPES, TERRAIN_TYPES } from "@/constants/townOptions";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/forms/town/common";

export default function TownFormBasics(){
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();

    const mapValue = watch("map");
    const isBrowser = typeof window !== "undefined";

    const previewUrl =
    typeof mapValue === "string"
        ? mapValue // existing URL from DB
        : isBrowser && mapValue instanceof FileList && mapValue[0]
        ? URL.createObjectURL(mapValue[0])
        : null;

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <Button variant="text" startIcon={<CasinoIcon />}>
                    Generate All Fields
                    </Button>
                </Box>

                <FormTextField
                    name="name"
                    label="Town Name"
                    registration={register("name")}
                    fieldError={errors.name}
                    required
                />
                
                <FormSelect
                    name="size"
                    label="Size Category"
                    control={control}
                    options={SIZE_TYPES}
                    fieldError={errors.size}
                />

                <FormChipSelect
                    name="tags"
                    label="Tags"
                    control={control}
                    options={TAG_TYPES}
                    fieldError={errors.tags}
                />

                <Accordion>
                <AccordionSummary id="extra-details" expandIcon={<ExpandMoreIcon />} sx={{mt: 2}}>
                    <Typography variant="h6">Extra Details</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <FormChipSelect
                        name="terrain"
                        label="Terrain Type"
                        control={control}
                        options={TERRAIN_TYPES}
                        fieldError={errors.terrain}
                    />

                    <FormSelect
                        name="climate"
                        label="Climate"
                        control={control}
                        options={CLIMATE_TYPES}
                        fieldError={errors.climate}
                    />

                    <FormSelect
                        name="magic"
                        label="Magic Level / Use"
                        control={control}
                        options={MAGIC_LEVELS}
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
                        registration={register("publicNotes")}
                        fieldError={errors.publicNotes}
                    />

                    <FormTextField
                        name="gmNotes"
                        label="GM Notes"
                        registration={register("gmNotes")}
                        fieldError={errors.gmNotes}
                    />

                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box>
                <Box mt={2}>
                    <Typography variant="subtitle1">Upload Town Map</Typography>
                    <input type="file" accept="image/*" {...register("map")} />
                    {typeof errors.map?.message === "string" && (
                    <Typography color="error">{errors.map.message}</Typography>
                    )}
                </Box>

                {previewUrl && (
                    <Box mt={2}>
                    <Typography variant="subtitle2">Preview:</Typography>
                    <img
                        src={previewUrl}
                        alt="Town map preview"
                        style={{ width: "100%", maxWidth: 400, borderRadius: 8 }}
                    />
                    </Box>
                )}
            </Box>
        </Stack>
    );
};