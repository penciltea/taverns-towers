import { FormSelect, FormChipSelect } from "@/components/Form"
import FormImageUpload from "@/components/Form/FormImageUpload"
import { CLIMATE_TYPES, TERRAIN_TYPES, TAG_TYPES } from "@/constants/environment.options"
import { toSelectOptions } from "@/lib/util/formatSelectOptions"
import { SiteFormData } from "@/schemas/site.schema"
import { useSiteContentStore } from "@/store/siteStore"
import { Box, Stack, Typography } from "@mui/material"
import { siteFormFieldsByType } from "./FieldsByType"
import { useSearchParams } from "next/navigation"
import { useFormContext } from "react-hook-form"

interface Props {
    mode: "add" | "edit" | null;
    isWilderness: boolean;
    generator?: {
        name: () => void;
        menuItems: () => void;
        missing: () => void;
        reroll: () => void;
    };
}

export default function SiteFormBasics( { mode, isWilderness, generator }: Props){
    const { selectedItem } = useSiteContentStore();  
    const searchParams = useSearchParams();
     const { control } = useFormContext();
    
    const typeParam = mode === 'edit'
        ? selectedItem?.type
        : (searchParams?.get("type") as SiteFormData["type"]);
    
    const SpecificFieldsComponent = typeParam && siteFormFieldsByType[typeParam];    

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
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
                        tooltip="This field influences the site's name and menu items (if available)"
                    />
                    <FormChipSelect
                        name="terrain"
                        label="Terrain Type"
                        control={control}
                        options={[{ label: "Random", value: "random" }, ...toSelectOptions(TERRAIN_TYPES)]}
                        tooltip="This field influences the site's name and menu items (if available)"
                    />

                    <FormChipSelect
                        name="tags"
                        label="Tags"
                        control={control}
                        options={[{ label: "Random", value: "random" }, ...toSelectOptions(TAG_TYPES)]}
                        tooltip="This field influences the site's name and menu items (if available)"
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
    )
}