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

            <Box sx={{mt: 4}}>
                <Typography variant="h6" sx={{mb: 2}}>Menu</Typography>
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