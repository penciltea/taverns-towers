import { FormSelect, FormTextField } from "@/components/Form";
import { FieldError, useFormContext } from "react-hook-form";
import { ENTERTAINMENT_VENUE_TYPES, SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";

export default function EntertainmentFields({generator}: SiteFormFieldProps){
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
                tooltip="This field influences entry cost calculations"
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences entry cost calculations"
            />
            <FormSelect
                name="venueType"
                label="Venue Type"
                control={control}
                options={[{ label: "Random", value: "random" }, ...ENTERTAINMENT_VENUE_TYPES]}
                fieldError={errors.venueType as FieldError | undefined}
                tooltip="This field influences name generation"
            />

            <FormTextField
                label="Entry / Ticket Cost"
                registration={register("cost")}
                fieldError={errors.cost}
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
        </>
    )
}