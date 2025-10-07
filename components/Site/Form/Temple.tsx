import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import FormEditableCard from "@/components/Form/FormEditableCard";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import { DOMAINS } from "@/constants/common.options";
import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { Box } from "@mui/material";
import { FieldError, useFormContext } from "react-hook-form";

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

            <FormChipSelect
                name="domains"
                label="Worshipped Domain(s)"
                required
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(DOMAINS)]}
                fieldError={errors.domains}
                tooltip="This field influences the following fields: relics, services item generation"
            />

            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_SIZE]}
                fieldError={errors.size as FieldError | undefined}
                tooltip="This field influences the following fields: relics, services item generation"
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences the following fields: relics, services item generation"
            />

            <FormTextField
                label="Relics"
                multiline
                rows={4}
                registration={register("relics")}
                fieldError={errors.relics}
                tooltip="This field is purely descriptive"
            />

            <FormTextField
                label="Public Notes"
                multiline
                rows={4}
                registration={register("publicNotes")}
                fieldError={errors.publicNotes}
                tooltip="This field is purely descriptive"
            />

            <FormTextField
                label="GM Notes"
                multiline
                rows={4}
                registration={register("gmNotes")}
                fieldError={errors.gmNotes}
                tooltip="This field is purely descriptive"
            />

            <Box sx={{mt: 4}}>
                <FormEditableCard
                    name="menu"
                    header="Services Offered"
                    siteType="temple"
                    onGenerateItems={(index?: number) => generator?.menuItems?.(index)}
                    buttonLabel="Conjure services"
                />
            </Box>
        </>
    )
}