import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { RULING_TYPES, WEALTH_LEVELS  } from "@/constants/settlementOptions";
import { FormTextField, FormSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";

export default function SettlementFormWealth(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Box>
            <FormTextField
                fullWidth
                name="leader"
                label="Leader(s)"
                registration={register("leader")}
                error={!!errors.leader}
                helperText={typeof errors.leader?.message === "string" ? errors.leader.message : ""}
                margin="normal"
            />

            <FormSelect
                name="wealth"
                label="Wealth"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(WEALTH_LEVELS)]}
                fieldError={errors.wealth}
            />
            
            <FormSelect
                name="rulingStyle"
                label="Ruling Style"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(RULING_TYPES)]}
                fieldError={errors.rulingStyle}
            />

            <FormTextField
                name="tradeNotes"
                fullWidth
                label="Trade Notes"
                multiline
                rows={6}
                registration={register("tradeNotes")}
                error={!!errors.tradeNotes}
                helperText={typeof errors.tradeNotes?.message === "string" ? errors.tradeNotes.message : ""}
                margin="normal"
            />
        </Box>
    );
};