import { FormSelect, FormTextField } from "@/components/Form";
import { FormChipSelect } from "@/components/Form";
import { SECRECY_LEVELS, SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { useFormContext } from "react-hook-form";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { Npc } from "@/interfaces/npc.interface";

export default function HiddenFields({generator}: SiteFormFieldProps){
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
                name="secrecy"
                label="Secrecy Level"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SECRECY_LEVELS]}
                fieldError={errors.secrecy}
            />
            
            <FormTextField
                name="knownTo"
                label="Known To"
                registration={register("knownTo")}
                fieldError={errors.knownTo}
            />

            <FormTextField
                name="defenses"
                label="Defense(s)"
                registration={register("defenses")}
                fieldError={errors.defenses}
            />

            <FormTextField
                name="purpose"
                label="Purpose"
                registration={register("purpose")}
                fieldError={errors.purpose}
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
        </>
    )
}