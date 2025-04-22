import { useFormContext } from "react-hook-form";
import { Box, Button } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import {CRIMINAL_ACTIVITY_TYPES  } from "@/constants/townOptions";
import { FormTextField, FormSelect, FormChipSelect } from "@/components/Form";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";

export default function TownFormCulture(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="text" startIcon={<CasinoIcon />}>
                Generate All Fields
                </Button>
            </Box>

            
            <FormChipSelect
                name="crime"
                label="Criminal Activity"
                control={control}
                options={toSelectOptions(CRIMINAL_ACTIVITY_TYPES)}
                fieldError={errors.crime}
            />


            <FormTextField
                name="religion"
                label="Major Religion(s)"
                registration={register("religion")}
                fieldError={errors.religion}
            />

            <FormTextField
                name="holidays"
                label="Holidays & Festivals"
                multiline
                rows={6}
                registration={register("holidays")}
                fieldError={errors.holidays}
            />
            
            <FormTextField
                name="folklore"
                label="Folklore & Superstitions"
                multiline
                rows={6}
                registration={register("folklore")}
                fieldError={errors.folklore}
            />
        </Box>
    );
};