import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SHOP_TYPES } from "@/constants/siteOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";

export default function ShopFields(){
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
                <Typography variant="h6" sx={{mb: 2}}>Wares</Typography>
                <FormEditableTable
                    name="wares"
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