import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { SITE_SIZE, SITE_CONDITION } from "@/constants/siteOptions";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function TempleFields({generator}: SiteFormFieldProps){
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
                <FormEditableTable
                    name="menu"
                    header="Services Offered"
                    onGenerate={generator?.menu}
                    buttonLabel="Conjure services"
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