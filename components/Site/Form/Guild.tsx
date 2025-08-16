import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { GUILD_MEMBERSHIP_REQUIREMENTS, GUILD_TYPES } from "@/constants/site/guild.options";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import FormEditableCard from "@/components/Form/FormEditableCard";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { Npc } from "@/interfaces/npc.interface";


export default function GuildFields({generator}: SiteFormFieldProps){
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
            <FormSelect
                name="guildType"
                label="Guild Type"
                required
                control={control}
                options={[{ label: "Random", value: "random" }, ...GUILD_TYPES]}
                fieldError={errors.guildTypes}
            />

            <FormFieldWithGenerate
                name="guildName"
                label="Guild Name"
                registration={register("guildName")}
                fieldError={errors.guildName}
                required                
                onGenerate={() => generator?.name?.("guildName")}
            />

            <FormFieldWithGenerate
                name="name"
                label="Site Name"
                registration={register("name")}
                fieldError={errors.name}
                required                
                onGenerate={() => generator?.name?.("name")}
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

            <FormChipSelect
                name="membershipRequirements"
                label="Membership Requirements"
                control={control}
                options={[
                    {
                        label: "Random",
                        options: [{ label: "Random", value: "random" }],
                    },
                    ...GUILD_MEMBERSHIP_REQUIREMENTS
                ]}
                fieldError={errors.membershipRequirements}
            />

            <FormTextField
                name="knownRivals"
                label="Known Rivals"
                registration={register("knownRivals")}
                fieldError={errors.knownRivals}
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
                    siteType="guild"
                    onGenerateItems={(index?: number) => generator?.menuItems?.(index)}
                    buttonLabel="Conjure services"
                    menuWarning="Please select a guild type to access the Services table"
                />
            </Box>
        </>
    )
}