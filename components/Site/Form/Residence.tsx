import { FormTextField } from "@/components/Form";
import { FormSelect } from "@/components/Form";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { Npc } from "@/interfaces/npc.interface";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { useFormContext } from "react-hook-form";

export default function ResidenceFields({generator}: SiteFormFieldProps){
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();


    // Get the array of occupant IDs from the form
    const occupantIds: string[] = watch("occupant") || [];

    // Fetch all owned NPCs (enabled only if there are occupant IDs)
    const { data: npcData } = useOwnedNpcsQuery(
        { page: 1, limit: 999 }, // adjust as needed
        { isEnabled: occupantIds.length > 0 }
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
            
            <FormTextField
                name="notableFeatures"
                label="Notable Features"
                registration={register("notableFeatures")}
                fieldError={errors.notableFeatures}
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