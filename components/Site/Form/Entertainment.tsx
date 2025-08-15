import { FormSelect, FormTextField } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { ENTERTAINMENT_VENUE_TYPES, SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import FormAssignEntityField from "@/components/Form/FormAssignEntity";
import AssignNpcDialog from "@/components/Npc/Dialog/AssignNpcDialog";
import { Npc } from "@/interfaces/npc.interface";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";

export default function EntertainmentFields({generator}: SiteFormFieldProps){
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();

    // Get the array of owner IDs from the form
    const ownerIds: string[] = watch("owner") || [];

    // Fetch all owned NPCs (enabled only if there are owner IDs)
    const { data: npcData } = useOwnedNpcsQuery(
        { page: 1, limit: 999 }, // adjust as needed
        { isEnabled: ownerIds.length > 0 }
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
            <FormSelect
                name="venueType"
                label="Venue Type"
                control={control}
                options={[{ label: "Random", value: "random" }, ...ENTERTAINMENT_VENUE_TYPES]}
                fieldError={errors.venueType}
            />

            <FormTextField
                name="cost"
                label="Entry / Ticket Cost"
                registration={register("cost")}
                fieldError={errors.cost}
            />

            <FormAssignEntityField<string, Npc>
                name="owner"
                label="Owner(s)"
                dialogComponent={AssignNpcDialog}
                getLabel={(npc) => npc.name || "Unnamed NPC"}
                mapDialogToFormValue={(npc) => npc._id} // store only ID in form
                mapFormValueToDialogItem={(id) => npcMap.get(id)} // look up NPC object for display
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