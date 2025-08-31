import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import { SITE_SIZE, SITE_CONDITION, TAVERN_ENTERTAINMENT_OFFERINGS } from "@/constants/site/site.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { Box } from "@mui/material";
import { FieldError, useFormContext } from "react-hook-form";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import FormEditableCard from "@/components/Form/FormEditableCard";

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
                fieldError={errors.size as FieldError | undefined}
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
            />
            
            <FormTextField
                label="Clientele"
                registration={register("clientele")}
                fieldError={errors.clientele}
            />

            <FormChipSelect
                name="entertainment"
                label="Entertainment Offerings"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(TAVERN_ENTERTAINMENT_OFFERINGS)]}
                fieldError={errors.entertainment}
            />

            <FormTextField
                label="Room Cost per Night"
                registration={register("cost")}
                fieldError={errors.cost}
            />

            <FormTextField
                label="Public Notes"
                multiline
                rows={4}
                registration={register("publicNotes")}
                fieldError={errors.publicNotes}
            />

            <FormTextField
                label="GM Notes"
                multiline
                rows={4}
                registration={register("gmNotes")}
                fieldError={errors.gmNotes}
            />

            <Box sx={{mt: 4}}>
                <FormEditableCard
                    name="menu"
                    header="Tavern Menu"
                    siteType="tavern"
                    onGenerateItems={(index?: number) => generator?.menuItems?.(index)}
                    buttonLabel="Conjure full menu"
                />
            </Box>
        </>
    )
}