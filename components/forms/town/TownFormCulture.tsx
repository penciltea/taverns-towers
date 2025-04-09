import { useFormContext, Controller } from "react-hook-form";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { RULING_TYPES, WEALTH_LEVELS  } from "@/constants/townOptions";

export default function TownFormCulture(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="text" startIcon={<CasinoIcon />}>
                Generate All Fields
                </Button>
            </Box>

            <FormControl fullWidth margin="normal">
                <InputLabel>Criminal Activity</InputLabel>
                <Controller
                name="crime"
                control={control}
                render={({ field }) => (
                    <Select {...field} label="Criminal Activity">
                    {WEALTH_LEVELS.map((option) => (
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
                label="Major Religions"
                {...register("religion")}
                error={!!errors.religion}
                helperText={typeof errors.religion?.message === "string" ? errors.religion.message : ""}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Holidays & Festivals"
                multiline
                    rows={6}
                {...register("holidays")}
                error={!!errors.holidays}
                helperText={typeof errors.holidays?.message === "string" ? errors.holidays.message : ""}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Folklore & Superstitions"
                multiline
                    rows={6}
                {...register("folklore")}
                error={!!errors.folklore}
                helperText={typeof errors.folklore?.message === "string" ? errors.folklore.message : ""}
                margin="normal"
            />
        </Box>
    );
};