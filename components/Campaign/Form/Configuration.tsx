import { FormChipSelect } from "@/components/Form";
import FormCheckboxField from "@/components/Form/FormCheckbox";
import { DOMAINS } from "@/constants/common.options";
import { NPC_RACES } from "@/constants/npc.options";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function CampaignFormConfiguration(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Typography gutterBottom>These configuration fields will allow Game Masters to control campaign-level generation settings, such as race availability, magical prevalence, and campaign activity status.</Typography>

            <Typography sx={{ mb: 4 }}>They&apos;re temporarily disabled during the Open Beta period while RealmFoundry finalizes balance and generation rules. Expect these options to unlock in future updates.</Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="p">Campaign Configurations</Typography>

                <Box>
                    <FormCheckboxField
                        label="Campaign is active"
                        registration={register("isActive")}
                        disabled
                    />
                </Box>
                

                <Box>
                    <FormCheckboxField
                        label="Campaign is publicly shareable"
                        registration={register("isPublic")}
                        disabled
                    />
                </Box>
            </Box>

            <Box>
                <Typography variant="h6" component="p">Generator Logic</Typography>

                <FormChipSelect
                    name="allowedRaces"
                    label="Allowed Races"
                    control={control}
                    options={[...NPC_RACES]}
                    fieldError={errors.allowedRaces}
                    disabled
                />

                <FormChipSelect
                    name="allowedDomains"
                    label="Allowed Domains"
                    control={control}
                    options={[...toSelectOptions(DOMAINS)]}
                    fieldError={errors.allowedDomains}
                    disabled
                />
            </Box>
        </>
    )
}