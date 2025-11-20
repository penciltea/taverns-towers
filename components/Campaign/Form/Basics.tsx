import { FormTextField, FormChipSelect } from "@/components/Form";
import FormChipInput from "@/components/Form/FormChipInput";
import FormRoleAssignmentInput from "@/components/Form/FormRoleAssignmentInput";
import { CAMPAIGN_ROLES, GENRES } from "@/constants/campaign.options";
import { TONE } from "@/constants/common.options";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { useFormContext } from "react-hook-form";

export default function CampaignFormBasics(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const roles = CAMPAIGN_ROLES;

    return (
        <>
            <FormTextField
                label="Campaign Name"
                required
                registration={register("name")}
                fieldError={errors.name}
            />

            <FormChipSelect
                name="genre"
                label="Genre"
                control={control}
                options={[...GENRES]}
                fieldError={errors.genre}
            />

            <FormChipSelect
                name="tone"
                label="Tone"
                control={control}
                options={[...toSelectOptions(TONE)]}
                fieldError={errors.tone}
                tooltip="This field will apply to any content created in this campaign" // ToDo: Update 
            />

            <FormTextField
                label="Campaign Description"
                registration={register("description")}
                fieldError={errors.description}
                multiline
                rows={4}
            />  

            <FormTextField
                label="Campaign Rules"
                registration={register("rules")}
                fieldError={errors.rules}
                multiline
                rows={4}
            />

            <FormChipInput
                name="links"
                label="External Link(s)"
                control={control}
            />

            <FormRoleAssignmentInput
                name="players"
                label="Campaign Players"
                control={control}
                roles={roles}
                itemLabel="Player"
                tooltip="Press Enter to add players and toggle their roles."
            />
        </>
    )
}