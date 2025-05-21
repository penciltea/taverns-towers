import { FormSelect, FormTextField } from "@/components/Form";
import FormEditableTable from "@/components/Form/FormEditableTable";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

type GuildFormProps = {
    handleGenerateName: () => void;
    handleGenerateMenu: () => void;
}

export default function GuildFields({handleGenerateName, handleGenerateMenu}: GuildFormProps){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <Stack direction="row" spacing={1} alignItems="flex-start">
                <FormTextField
                    name="name"
                    label="Site Name"
                    registration={register("name")}
                    fieldError={errors.name}
                    required
                />
                    <Button
                    variant="outlined"
                    onClick={handleGenerateName}
                    size="large"
                    sx={{ mt: 2, py: 1.65 }} // align with text field's margin
                >
                    Generate
                </Button>
            </Stack>

            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={SITE_SIZE}
                fieldError={errors.size}
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={SITE_CONDITION}
                fieldError={errors.condition}
            />
            <FormTextField
                name="guildName"
                label="Guild Name"
                registration={register("guildName")}
                fieldError={errors.guildName}
            />
            
            <FormTextField
                name="guildType"
                label="Guild Type"
                registration={register("guildType")}
                fieldError={errors.guildType}
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
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant="h6" sx={{mb: 2}}>Services Offered</Typography>
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={handleGenerateMenu}
                        size="large"
                        sx={{ mt: 2, py: 1.65 }}
                    >
                        Conjure services
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