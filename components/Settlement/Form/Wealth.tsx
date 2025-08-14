'use client'

import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { RULING_TYPES, WEALTH_LEVELS  } from "@/constants/settlementOptions";
import { FormTextField, FormSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormAssignEntityField from "@/components/Form/FormAssignEntity";
import AssignNpcDialog from "@/components/Npc/Dialog/AssignNpcDialog";
import { Npc } from "@/interfaces/npc.interface";

export default function SettlementFormWealth(){
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext();

    return (
        <Box>
            <FormAssignEntityField<string, Npc>
                name="leader"
                label="Leaders"
                dialogComponent={AssignNpcDialog}
                getLabel={(npc) => npc.name || "Unnamed NPC"}
                mapDialogToFormValue={(npc) => npc._id} // store only the string _id
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