import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { SITE_SIZE, SITE_CONDITION } from "@/constants/siteOptions";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";

export default function TavernFields({generator}: SiteFormFieldProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormFieldWithGenerate
                name="name"
                label="Site Name"
                required
                registration={register("name")}
                fieldError={errors.name}
                onGenerate={generator?.name}
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
                <FormEditableTable
                    name="menu"
                    header="Tavern Menu"
                    onGenerate={generator?.menu}
                    buttonLabel="Conjure menu items"
                    columns={[
                        { label: "Name", field: "name" },
                        { label: "Category", field: "category" },
                        { label: "Quality", field: "quality"},
                        { label: "Description", field: "description" },
                        { label: "Price", field: "price" },
                    ]}
                />
            </Box>
        </>
    )
}