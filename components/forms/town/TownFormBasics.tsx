import { useFormContext, Controller } from "react-hook-form";
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, Accordion, AccordionDetails, AccordionSummary, Stack } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CLIMATE_TYPES, MAGIC_LEVELS, SIZE_TYPES, TAG_TYPES, TERRAIN_TYPES } from "@/constants/townOptions";

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

                <TextField
                    fullWidth
                    label="Town Name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={typeof errors.name?.message === "string" ? errors.name.message : ""}
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Size Category</InputLabel>
                    <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} label="Size Category">
                        {SIZE_TYPES.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </Select>
                    )}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Tags</InputLabel>
                    <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <Select
                        {...field}
                        multiple
                        input={<OutlinedInput label="Tags" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value: string) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        >
                        {TAG_TYPES.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </Select>
                    )}
                    />
                </FormControl>

                <Accordion>
                <AccordionSummary id="extra-details" expandIcon={<ExpandMoreIcon />} sx={{mt: 2}}>
                    <Typography variant="h6">Extra Details</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Terrain</InputLabel>
                        <Controller
                        name="terrain"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                            multiple
                            input={<OutlinedInput label="Terrain" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value: string) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            >
                            {TERRAIN_TYPES.map((option) => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                            </Select>
                        )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Climate</InputLabel>
                        <Controller
                            name="climate"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} label="Climate">
                                    {CLIMATE_TYPES.map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Magic Level</InputLabel>
                        <Controller
                            name="magic"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} label="Magic Level">
                                    {MAGIC_LEVELS.map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Common Races"
                        {...register("races")}
                        error={!!errors.races}
                        helperText={typeof errors.races?.message === "string" ? errors.races.message : ""}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Public Notes"
                        multiline
                        rows={6}
                        {...register("publicNotes")}
                        error={!!errors.publicNotes}
                        helperText={typeof errors.publicNotes?.message === "string" ? errors.publicNotes.message : ""}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="GM Notes"
                        multiline
                        rows={6}
                        {...register("gmNotes")}
                        error={!!errors.gmNotes}
                        helperText={typeof errors.gmNotes?.message === "string" ? errors.gmNotes.message : ""}
                        margin="normal"
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