import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import FormEditableCard from "@/components/Form/FormEditableCard";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { DOMAINS } from "@/constants/settlementOptions";
import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { Npc } from "@/interfaces/npc.interface";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function TempleFields({generator}: SiteFormFieldProps){
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
        <>
            <FormFieldWithGenerate
                name="name"
                label="Site Name"
                required
                registration={register("name")}
                fieldError={errors.name}
                onGenerate={generator?.name}
            />

            <FormChipSelect
                name="domains"
                label="Worshipped Domain(s)"
                required
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(DOMAINS)]}
                fieldError={errors.domains}
            />

            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_SIZE]}
                fieldError={errors.size}
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition}
            />

            <FormTextField
                name="relics"
                label="Relics"
                multiline
                rows={4}
                registration={register("relics")}
                fieldError={errors.relics}
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

            <Box sx={{mt: 4}}>
                <FormEditableCard
                    name="menu"
                    header="Services Offered"
                    siteType="temple"
                    onGenerateItems={(index?: number) => generator?.menuItems?.(index)}
                    buttonLabel="Conjure services"
                />
            </Box>
        </>
    )
}