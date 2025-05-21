import { FormSelect, FormTextField } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { ENTERTAINMENT_VENUE_TYPES, SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { Stack, Button } from "@mui/material";

type EntertainmentFormProps = {
  handleGenerateName: () => void;
  handleGenerateMenu: () => void;
  settlementContext: {
    terrain: string[] | undefined;
    climate: string | undefined;
    tags: string[] | undefined;
  };
};

export default function EntertainmentFields({handleGenerateName}: EntertainmentFormProps){
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
            <FormSelect
                name="venueType"
                label="Venue Type"
                control={control}
                options={toSelectOptions(ENTERTAINMENT_VENUE_TYPES)}
                fieldError={errors.shopType}
            />
            
            <FormTextField
                name="owner"
                label="Owner"
                registration={register("owner")}
                fieldError={errors.owner}
            />
            
            <FormTextField
                name="performances"
                label="Performances"
                registration={register("performances")}
                fieldError={errors.performances}
            />

            <FormTextField
                name="cost"
                label="Cost"
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
        </>
    )
}