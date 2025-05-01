import { useFormContext, Controller } from "react-hook-form";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { RULING_TYPES, WEALTH_LEVELS  } from "@/constants/settlementOptions";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";

export default function SettlementFormWealth(){
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

            <FormSelect
                name="wealth"
                label="Wealth"
                control={control}
                options={toSelectOptions(WEALTH_LEVELS)}
                fieldError={errors.wealth}
            />
            
            <FormSelect
                name="rulingStyle"
                label="Ruling Style"
                control={control}
                options={toSelectOptions(RULING_TYPES)}
                fieldError={errors.rulingStyle}
            />

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