import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { SITE_CONDITION, SITE_SIZE, GUILD_TYPES } from "@/constants/siteOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";


export default function GuildFields({generator}: SiteFormFieldProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <FormSelect
                name="guildType"
                label="Guild Type"
                required
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(GUILD_TYPES)]}
                fieldError={errors.guildTypes}
            />

            <FormTextField
                name="guildName"
                label="Guild Name"
                registration={register("guildName")}
                fieldError={errors.guildName}
            />

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
                name="leader"
                label="Leader(s)"
                registration={register("leaders")}
                fieldError={errors.leaders}
            />

            <FormTextField
                name="membershipRequirements"
                label="Membership Requirements"
                registration={register("membershipRequirements")}
                fieldError={errors.membershipRequirements}
            />

            <FormTextField
                name="knownRivals"
                label="Known Rivals"
                registration={register("knownRivals")}
                fieldError={errors.knownRivals}
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