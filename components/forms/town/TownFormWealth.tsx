import { useFormContext, Controller } from "react-hook-form";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { RULING_TYPES, WEALTH_LEVELS  } from "@/constants/townOptions";

export default function TownFormWealth(){
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

            <TextField
                fullWidth
                label="Leaders"
                {...register("leader")}
                error={!!errors.leader}
                helperText={typeof errors.leader?.message === "string" ? errors.leader.message : ""}
                margin="normal"
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Ruling Style</InputLabel>
                <Controller
                name="rulingStyle"
                control={control}
                render={({ field }) => (
                    <Select {...field} label="Ruling Style">
                    {RULING_TYPES.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </Select>
                )}
                />
            </FormControl>


            <FormControl fullWidth margin="normal">
                <InputLabel>Wealth Level</InputLabel>
                <Controller
                name="wealth"
                control={control}
                render={({ field }) => (
                    <Select {...field} label="Wealth Level">
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
                label="Trade Notes"
                multiline
                    rows={6}
                {...register("tradeNotes")}
                error={!!errors.tradeNotes}
                helperText={typeof errors.tradeNotes?.message === "string" ? errors.tradeNotes.message : ""}
                margin="normal"
            />
        </Box>
    );
};