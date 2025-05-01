import { FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function GuildFields(){
    const {
        register,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormTextField
                name="guildName"
                label="Guild Name"
                registration={register("guildName")}
                fieldError={errors.guildName}
            />
            
            <FormTextField
                name="focus"
                label="Focus"
                registration={register("focus")}
                fieldError={errors.focus}
            />

            <FormTextField
                name="leader"
                label="Leader(s)"
                registration={register("leaders")}
                fieldError={errors.leaders}
            />

            <FormTextField
                name="membershipRequirements"
                label="Membership Requirements"
                registration={register("membershipRequirements")}
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
                <Typography variant="h6" sx={{mb: 2}}>Services Offered</Typography>
                <FormEditableTable
                    name="services"
                    columns={[
                        { label: "Name", field: "name" },
                        { label: "Description", field: "description" },
                        { label: "Price", field: "price" },
                    ]}
                />
            </Box>
        </>
    )
}