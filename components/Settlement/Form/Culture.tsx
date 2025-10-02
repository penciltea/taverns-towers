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
            />

            <FormTextField
                label="Holidays & Festivals"
                multiline
                rows={6}
                registration={register("holidays")}
                fieldError={errors.holidays}
            />
            
            <FormTextField
                label="Folklore & Superstitions"
                multiline
                rows={6}
                registration={register("folklore")}
                fieldError={errors.folklore}
            />
        </Box>
    );
};