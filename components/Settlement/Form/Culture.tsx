import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { DOMAINS  } from "@/constants/common.options";
import { FormTextField, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";

export default function SettlementFormCulture(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Box>
            
            <FormChipSelect
                name="domains"
                label="Commonly-Worshipped Domain(s)"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(DOMAINS)]}
                fieldError={errors.domains}
                tooltip="This field influences the following fields: holidays, folklore & superstitions"
            />

            <FormTextField
                label="Holidays & Festivals"
                multiline
                rows={6}
                registration={register("holidays")}
                fieldError={errors.holidays}
                tooltip="This field is purely descriptive and doesn't influence other fields."
            />
            
            <FormTextField
                label="Folklore & Superstitions"
                multiline
                rows={6}
                registration={register("folklore")}
                fieldError={errors.folklore}
                tooltip="This field is purely descriptive and doesn't influence other fields."
            />
        </Box>
    );
};