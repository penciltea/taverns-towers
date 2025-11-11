import { useUIStore } from "@/store/uiStore";
import { FormChipSelect, FormSelect, FormTextField } from "@/components/Form";
import Box from "@mui/material/Box";
import { FieldError, useFormContext } from "react-hook-form";
import { SHOP_TYPE_CATEGORIES, SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import FormFieldWithGenerate from "@/components/Form/FormTextFieldWithGenerate";
import FormEditableCard from "@/components/Form/FormEditableCard";
import { useAuthStore } from "@/store/authStore";
import { userTier } from "@/constants/user.options";
import { handleSiteThemesByTier } from "@/lib/util/getMembershipTierForFields";

export default function ShopFields({generator}: SiteFormFieldProps){
    const { setOpenDialog } = useUIStore();
    const methods = useFormContext();
    
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { user } = useAuthStore();
    
    const handleTypeChange = (field: "shopType" | "guildType", value: string) => {
        // Check to see if menu has been generated before, to avoid menu category conflicts
        const menu = methods.getValues("menu") || [];
        const hasMenuItems = Array.isArray(menu) && menu.length > 0;

        if (hasMenuItems) {
            setOpenDialog("typeChangeDialog", {
                open: true,
                methods,
                siteChange: {
                    type: "shop",
                    field: "shopType",
                    value: value
                }
            });
        } else {
            // No menu data — safe to apply immediately
            methods.setValue(field, value);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormSelect
                name="shopType"
                label="Shop Type"
                required
                control={control}
                options={[
                    { label: "Random", value: "random" },
                    ...SHOP_TYPE_CATEGORIES,
                ]}
                fieldError={errors.shopType as FieldError | undefined}
                onChange={(e) => handleTypeChange("shopType", e.target.value as string)}
                tooltip="This field influences name and menu item generation."
            />

            <FormFieldWithGenerate
                name="name"
                label="Shop Name"
                required
                registration={register("name")}
                fieldError={errors.name}
                onGenerate={generator?.name}
            />   

            <FormChipSelect
                name="siteTheme"
                label="Theme"
                control={control}
                options={handleSiteThemesByTier(user?.tier ?? userTier[0])}
                fieldError={errors.siteTheme}
                tooltip="This field influences name generation."
            />

            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_SIZE]}
                fieldError={errors.size as FieldError | undefined}
                tooltip="This field influences menu item generation."
            />

            <FormSelect
                name="condition"
                label="Condition"
                control={control}
                options={[{ label: "Random", value: "random" }, ...SITE_CONDITION]}
                fieldError={errors.condition as FieldError | undefined}
                tooltip="This field influences menu item generation."
            />

            <FormTextField
                label="Public Notes"
                multiline
                rows={4}
                registration={register("publicNotes")}
                fieldError={errors.publicNotes}
                tooltip="This field is purely descriptive."
            />

            <FormTextField
                label="GM Notes"
                multiline
                rows={4}
                registration={register("gmNotes")}
                fieldError={errors.gmNotes}
                tooltip="This field is purely descriptive."
            />

            <Box sx={{mt: 4}}>
                <FormEditableCard
                    name="menu"
                    header="Available Wares & Services"
                    siteType="shop"
                    onGenerateItems={(index?: number) => generator?.menuItems?.(index)}
                    buttonLabel="Conjure full wares & services"
                    menuWarning="Please select a shop type to access the Wares & Services table"
                />
            </Box>
        </Box>
    )
}