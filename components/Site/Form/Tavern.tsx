import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { SITE_SIZE, SITE_CONDITION } from "@/constants/siteOptions";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

type TavernFormProps = {
    handleGenerateName: () => void;
    handleGenerateMenu: () => void;
}

export default function TavernFields({handleGenerateName, handleGenerateMenu}: TavernFormProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <Stack direction="row" spacing={1} alignItems="flex-start">
                <FormTextField
                    name="name"
                    label="Site Name"
                    registration={register("name")}
                    fieldError={errors.name}
                    required
                />
                    <Button
                    variant="outlined"
                    onClick={handleGenerateName}
                    size="large"
                    sx={{ mt: 2, py: 1.65 }} // align with text field's margin
                >
                    Generate
                </Button>
            </Stack>

            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={SITE_SIZE}
                fieldError={errors.size}
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={SITE_CONDITION}
                fieldError={errors.condition}
            />

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
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant="h6" sx={{mb: 2}}>Tavern Menu</Typography>
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={handleGenerateMenu}
                        size="large"
                        sx={{ mt: 2, py: 1.65 }}
                    >
                        Conjure menu items
                    </Button>
                </Box>
                <FormEditableTable
                    name="menu"
                    columns={[
                        { label: "Name", field: "name" },
                        { label: "Category", field: "category" }, 
                        { label: "Description", field: "description" },
                        { label: "Price", field: "price" },
                    ]}
                />
            </Box>
        </>
    )
}