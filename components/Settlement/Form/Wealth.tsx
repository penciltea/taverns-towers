'use client'

import { FieldError, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { RULING_TYPES, WEALTH_LEVELS  } from "@/constants/settlementOptions";
import { FormTextField, FormSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormAssignEntityField from "@/components/Form/FormAssignEntity";
import AssignNpcDialog from "@/components/Npc/Dialog/AssignNpcDialog";
import { Npc } from "@/interfaces/npc.interface";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";

export default function SettlementFormWealth(){
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();

    // Get the array of leader IDs from the form
    const leaderIds: string[] = watch("leader") || [];

    // Fetch all owned NPCs (enabled only if there are leader IDs)
    const { data: npcData } = useOwnedNpcsQuery(
        { page: 1, limit: 999 }, // adjust as needed
        { isEnabled: leaderIds.length > 0 }
    );

    // Map ID -> NPC object for name display
    const npcMap = new Map<string, Npc>(
        npcData?.npcs.map((npc) => [npc._id, npc]) || []
    );

    return (
        <Box>
            <FormAssignEntityField<string, Npc>
                name="leader"
                label="Leader(s)"
                dialogComponent={AssignNpcDialog}
                getLabel={(npc) => npc.name || "Unnamed NPC"}
                mapDialogToFormValue={(npc) => npc._id} // store only ID in form
                mapFormValueToDialogItem={(id) => npcMap.get(id)} // look up NPC object for display
            />

            <FormSelect
                name="wealth"
                label="Wealth"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(WEALTH_LEVELS)]}
                fieldError={errors.wealth as FieldError | undefined}
            />
            
            <FormSelect
                name="rulingStyle"
                label="Ruling Style"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(RULING_TYPES)]}
                fieldError={errors.rulingStyle as FieldError | undefined}
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
            />
        </Box>
    );
};