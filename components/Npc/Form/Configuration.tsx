import FormCheckboxField from "@/components/Form/FormCheckbox";
import FormChipInput from "@/components/Form/FormChipInput";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function NpcFormConfiguration(){
    const {
        register,
        control
    } = useFormContext();

    return (
        <>
            <Typography gutterBottom>These configuration fields are for setting permissions for sharing, editing, and so on.</Typography>

            <Typography sx={{ mb: 4 }}>They&apos;re temporarily disabled during the Open Beta period while RealmFoundry polishes functionality. Expect these options to unlock in future updates.</Typography>

            <Box sx={{ mb: 4 }}>                
                <Box>
                    <FormCheckboxField
                        label="NPC is publicly shareable"
                        registration={register("isPublic")}
                        disabled
                    />
                </Box>

                <Box>
                    <FormCheckboxField
                        label="Share to RealmFoundry's Collection"
                        registration={register("isPublic")}
                        disabled
                    />
                </Box>

                <Box>
                    <FormChipInput
                        name="editors"
                        control={control}
                        label="Allowed editors for this NPC"
                    />
                </Box>
            </Box>
        </>
    )
}