import { Controller, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { FormConnectionAccordion } from "@/components/Form/FormConnectionAccordion";

export default function NpcFormConnections(){
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const testOptions = [
        { id: "1", name: "Dog" },
        { id: "2", name: "Cat" },
        { id: "3", name: "Rabbit" },
    ];

    return (
        <Box>
            <Controller
                name="connections"
                control={control}
                render={({ field }) => (
                    <FormConnectionAccordion
                    label="Settlements"
                    availableOptions={testOptions}
                    roleOptions={["Resident", "Leader", "Visitor"]}
                    value={field.value}
                    onChange={field.onChange}
                    control={control}
                    namePrefix="connections"
                    />
                )}
                />
        </Box>
    );
};