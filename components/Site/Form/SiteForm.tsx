import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Paper, Typography, Stack, Box, Button } from "@mui/material";
import { SiteFormData } from "@/schemas/site.schema";
import { FormTextField, FormSelect } from "@/components/Form";
import { SITE_CATEGORIES, SITE_SIZE, SITE_CONDITION } from "@/constants/siteOptions";
import { siteFormFieldsByType } from "@/components/Site/Form/FieldsByType";
import FormImageUpload from "@/components/Form/FormImageUpload";
import FormActions from "@/components/Form/FormActions";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";

type SiteFormProps = {
  onSubmit: (data: SiteFormData) => void;
  mode: "add" | "edit" | null;
  settlementContext: {
    terrain: string[] | undefined;
    climate: string | undefined;
    tags: string[] | undefined;
  };
};

export default function SiteForm({ onSubmit, mode, settlementContext }: SiteFormProps){
    const searchParams = useSearchParams();
    const methods = useFormContext<SiteFormData>();
    const { handleSubmit, register, control, formState: { errors } } = methods;
    const { selectedItem } = useSiteContentStore();
    const { isSubmitting } = useUIStore();
    const { setValue } = useFormContext<SiteFormData>();

    const typeParam = mode === 'edit'
    ? selectedItem?.type
    : (searchParams?.get("type") as SiteFormData["type"]);

    const SpecificFieldsComponent = typeParam && siteFormFieldsByType[typeParam];

    const typeLabel = typeParam
    ? getLabelFromValue(SITE_CATEGORIES, typeParam, "Unknown")
    : "Unknown";

    
     async function handleGenerateName() {
        if (!typeParam) return;
            const name = await generateSiteName({
            siteType: typeParam,
            terrain: settlementContext.terrain,
            climate: settlementContext.climate,
            tags: settlementContext.tags,
        });

        setValue("name", name); // Set name into RHF
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }} >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" gutterBottom>
                    {mode === 'edit' ? `Edit ${selectedItem?.name}` : `Create Site (${typeLabel})`}
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <Box>
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

                        {SpecificFieldsComponent ? (
                            <SpecificFieldsComponent />
                        ) : (
                            <Typography variant="body2">
                                {typeParam ? `Unknown site type: ${typeParam}` : "No site type selected."}
                            </Typography>
                        )}
                        
                    </Box>
                    
                    {typeParam && (
                        <Box sx={{paddingTop: 4}}>
                            <FormImageUpload name="image" label="Upload Site Image" />
                        </Box>
                    )}
                </Stack>

                <FormActions isSubmitting={isSubmitting} mode={mode} entityName="Site" />
            </Box>
        </Paper>
    )
};