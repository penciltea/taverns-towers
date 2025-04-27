import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function TavernFields(){
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormTextField
                name="owner"
                label="Owner"
                registration={register("owner")}
                fieldError={errors.owner}
            />
            
            <FormTextField
                name="clientele"
                label="Clientele"
                registration={register("clientele")}
                fieldError={errors.clientele}
            />

            <FormTextField
                name="entertainment"
                label="Entertainment Offerings"
                registration={register("entertainment")}
                fieldError={errors.entertainment}
            />

            <FormTextField
                name="cost"
                label="Room Cost per Night"
                registration={register("cost")}
                fieldError={errors.cost}
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
                <Typography variant="h6" sx={{mb: 2}}>Tavern Menu</Typography>
                <FormEditableTable
                    name="menu"
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