'use client'

import { FieldError, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { CRIMINAL_ACTIVITY_TYPES, MILITARY_PRESENCE_TYPES, RULING_TYPES, WEALTH_LEVELS  } from "@/constants/settlement.options";
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
            <FormSelect
                name="rulingStyle"
                label="Ruling Style"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(RULING_TYPES)]}
                fieldError={errors.rulingStyle as FieldError | undefined}
                tooltip="This field influences the following fields: military presence"
            />
            
            <FormSelect
                name="wealth"
                label="Wealth"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(WEALTH_LEVELS)]}
                fieldError={errors.wealth as FieldError | undefined}
                tooltip="This field influences the following fields: name, common races, magic level/use, military presence, criminal activity"
            />

            <FormChipSelect
                name="military"
                label="Military Presence"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(MILITARY_PRESENCE_TYPES)]}
                tooltip="This field is purely descriptive and doesn't influence other fields."
            />

            <FormChipSelect
                name="crime"
                label="Criminal Activity"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(CRIMINAL_ACTIVITY_TYPES)]}
                fieldError={errors.crime}
                tooltip="This field is purely descriptive and doesn't influence other fields."
            />

            <FormTextField
                fullWidth
                label="Trade Notes"
                multiline
                rows={6}
                registration={register("tradeNotes")}
                error={!!errors.tradeNotes}
                helperText={typeof errors.tradeNotes?.message === "string" ? errors.tradeNotes.message : ""}
                margin="normal"
                tooltip="This field is purely descriptive and doesn't influence other fields."
            />
        </Box>
    );
};