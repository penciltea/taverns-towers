import { FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function TempleFields(){
    const {
        register,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormTextField
                name="deity"
                label="Deity"
                registration={register("deity")}
                fieldError={errors.deity}
            />

            <FormTextField
                name="leader"
                label="Leader(s)"
                registration={register("leader")}
                fieldError={errors.leader}
            />

            <FormTextField
                name="relics"
                label="Relics"
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