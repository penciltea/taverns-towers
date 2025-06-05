import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Paper, Typography, Stack, Box, Button } from "@mui/material";
import { SiteFormData } from "@/schemas/site.schema";
import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { siteFormFieldsByType } from "@/components/Site/Form/FieldsByType";
import FormImageUpload from "@/components/Form/FormImageUpload";
import FormActions from "@/components/Form/FormActions";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { FormChipSelect, FormSelect } from "@/components/Form";
import { CLIMATE_TYPES, TAG_TYPES, TERRAIN_TYPES } from "@/constants/environmentOptions";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";


type SiteFormProps = {
  onSubmit: (data: SiteFormData) => void;
  mode: "add" | "edit" | null;
  isWilderness: boolean;
  generator?: {
    name: () => void;
    menu: () => void;
    all: () => void;
    reroll: () => void;
  };
};

export default function SiteForm({ onSubmit, mode, isWilderness, generator }: SiteFormProps) {
  const searchParams = useSearchParams();
  const methods = useFormContext<SiteFormData>();
  const { control, register, setValue, handleSubmit, formState: { errors } } = methods;
  const { selectedItem } = useSiteContentStore();
  const { isSubmitting } = useUIStore();

  const typeParam = mode === 'edit'
    ? selectedItem?.type
    : (searchParams?.get("type") as SiteFormData["type"]);

  const SpecificFieldsComponent = typeParam && siteFormFieldsByType[typeParam];
  const typeLabel = typeParam
    ? getLabelFromValue(SITE_CATEGORIES, typeParam, "Unknown")
    : "Unknown";

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }} >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          {mode === 'edit' ? `Edit ${selectedItem?.name}` : `Create Site (${typeLabel})`}
        </Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>
            Whether you prefer to craft every detail or need a quick spark of inspiration, you can manually fill in the fields below or use the <strong>Generate</strong> buttons to populate them.
        </Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>
            The generator fills in all site details—like size, condition, and more. Fields set to "random" will be chosen based on your other selections.
        </Typography>

        <Typography variant="subtitle1" component="p" gutterBottom>
            Use the buttons to either fill missing/random fields or to fully reroll all fields. You can always adjust results afterward!
        </Typography>

        <Box sx={{
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginTop: 2,
          marginBottom: { xs: 5, sm: 2 },
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button
            type="button"
            variant="contained"
            onClick={generator?.all}
            size="large"
            sx={{ mt: 2, py: 1.65 }}
          >
            Generate Missing Fields
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={generator?.reroll}
            size="large"
            sx={{ mt: 2, py: 1.65 }}
          >
            Reroll All Fields
          </Button>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          <Box>
            {isWilderness && (
              <>
                <Box sx={{marginBottom: 4}}>
                  <Typography variant="h5" component="p" gutterBottom>Wilderness Details</Typography>
                  <Typography variant="subtitle1" component="p" gutterBottom>While most sites are created in the context of a settlement, you may want to create a site that is detached from any settlements-- small wayshrines, trading caravans, and so on.</Typography>
                  <Typography variant="subtitle1" component="p" gutterBottom>The fields below will help the arcane forces conjure appropriate site details based on their surroundings. Feel free to choose specific options or randomize them as you see fit! </Typography>

                  <FormSelect
                      name="climate"
                      label="Climate"
                      control={control}
                      options={[{ label: "Random", value: "random" }, ...toSelectOptions(CLIMATE_TYPES)]}
                  />
                  <FormChipSelect
                      name="terrain"
                      label="Terrain Type"
                      control={control}
                      options={[{ label: "Random", value: "random" }, ...toSelectOptions(TERRAIN_TYPES)]}
                  />

                  <FormChipSelect
                      name="tags"
                      label="Tags"
                      control={control}
                      options={[{ label: "Random", value: "random" }, ...toSelectOptions(TAG_TYPES)]}
                  />
                  
                </Box>

                <Typography variant="h5" component="p" gutterBottom>Site Details</Typography>
              </>
            )}

            {SpecificFieldsComponent ? (
              <SpecificFieldsComponent generator={generator} />
            ) : (
              <Typography variant="body2">
                {typeParam ? `Unknown site type: ${typeParam}` : "No site type selected."}
              </Typography>
            )}
          </Box>

          {typeParam && (
            <Box sx={{ paddingTop: 4 }}>
              <FormImageUpload name="image" label="Upload Site Image" />
            </Box>
          )}
        </Stack>

        <FormActions isSubmitting={isSubmitting} mode={mode} entityName="Site" />
      </Box>
    </Paper>
  );
}