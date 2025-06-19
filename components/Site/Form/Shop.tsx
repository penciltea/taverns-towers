import { FormSelect, FormTextField } from "@/components/Form";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SHOP_TYPES, SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import FormEditableCard from "@/components/Form/FormEditableCard";

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
                <FormEditableCard
                    name="menu"
                    header="Available Wares & Services"
                    siteType="shop"
                    onGenerate={generator?.menu}
                    buttonLabel="Conjure wares & services"
                />
            </Box>
        </>
    )
}