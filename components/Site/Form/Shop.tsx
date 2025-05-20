import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { Box, Button, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SHOP_TYPES } from "@/constants/siteOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";

type SiteFormProps = {
    handleGenerateMenu: () => void;
}

export default function ShopFields({handleGenerateMenu}: SiteFormProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormSelect
                name="shopType"
                label="Shop Type"
                required
                control={control}
                options={toSelectOptions(SHOP_TYPES)}
                fieldError={errors.shopType}
            />

            <FormTextField
                name="owner"
                label="Owner"
                registration={register("owner")}
                fieldError={errors.owner}
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
                    <Typography variant="h6" sx={{mb: 2}}>Wares</Typography>
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