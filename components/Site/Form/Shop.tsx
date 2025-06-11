import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SHOP_TYPES, SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";

export default function ShopFields({generator}: SiteFormFieldProps){
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
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(SHOP_TYPES)]}
                fieldError={errors.shopType}
            />

            <FormFieldWithGenerate
                name="name"
                label="Site Name"
                required
                registration={register("name")}
                fieldError={errors.name}
                onGenerate={generator?.name}
            />

            <FormTextField
                name="owner"
                label="Owner"
                registration={register("owner")}
                fieldError={errors.owner}
            />            

            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_SIZE]}
                fieldError={errors.size}
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition}
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
                <FormEditableTable
                    name="menu"
                    header="Available Wares & Services"
                    onGenerate={generator?.menu}
                    buttonLabel="Conjure wares & services"
                    columns={[
                        { label: "Name", field: "name" },
                        { label: "Category", field: "category" },
                        { label: "Quality", field: "quality"}, 
                        { label: "Quantity", field: "quantity"},
                        { label: "Description", field: "description" },
                        { label: "Price", field: "price" },
                    ]}
                />
            </Box>
        </>
    )
}