"use client";

import { useMemo } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Control, FieldValues, Path } from "react-hook-form";
import FormSelect, { Option } from "@/components/Form/FormSelect";
import { NpcConnection } from "@/interfaces/connection.interface";
import { NpcConnectionType } from "@/constants/npc.options";

export type ConnectionItem = NpcConnection & { name: string };

interface EntityLinkFormProps<TFieldValues extends FieldValues> {
    label: string;
    availableOptions: { id: string; name: string }[];
    value: ConnectionItem[];
    onChange: (updated: ConnectionItem[]) => void;
    roleOptions: Option[];
    control: Control<TFieldValues>;
    namePrefix: string;
    type: NpcConnectionType;
    dynamicRoleOptions?: (id: string | undefined) => Option[];
}

export default function EntityLinkForm<TFieldValues extends FieldValues>({
    label,
    availableOptions,
    value,
    onChange,
    roleOptions,
    control,
    namePrefix,
    type,
    dynamicRoleOptions,
}: EntityLinkFormProps<TFieldValues>) {
    // Map IDs to names to display properly when editing
    const optionsMap = useMemo(() => new Map(availableOptions.map(o => [o.id, o.name])), [availableOptions]);

    const handleAdd = (id: string) => {
        if (!value.find(v => v.id === id)) {
        const newItem = availableOptions.find(opt => opt.id === id);
        if (newItem) {
            onChange([...value, { id: newItem.id, name: newItem.name, role: "", type }]);
        }
        }
    };

    const handleRemove = (id: string) => {
        onChange(value.filter(item => item.id !== id));
    };

    const handleRoleChange = (index: number, newRole: string) => {
        const updated = [...value];
        updated[index].role = newRole;
        onChange(updated);
    };

    const safeValue = value ?? [];
    const selectedIds = safeValue.map(v => v.id);

    const selectOptions: Option[] = availableOptions.map(opt => ({
        value: opt.id,
        label: opt.name,
    }));

    return (
        <>
        {/* Selector for adding new items */}
        <Box mb={2}>
            <FormSelect
                name={`${namePrefix}.selector` as Path<TFieldValues>}
                label={`Add ${label}`}
                control={control}
                options={selectOptions.filter(opt => !selectedIds.includes(opt.value))}
                onChange={(e) => handleAdd((e.target as HTMLInputElement).value)}
            />
        </Box>

        <Stack spacing={2}>
            {safeValue.map((item, index) => {
                const displayName = optionsMap.get(item.id) ?? item.name ?? "[Unknown]";

                const rowRoleOptions = dynamicRoleOptions
                    ? dynamicRoleOptions(item.id)
                    : roleOptions;

                return (
                    <Box
                        key={item.id}
                        display="grid"
                        gridTemplateColumns="1fr 1fr auto"
                        alignItems="center"
                        gap={2}
                    >
                        <Typography>{displayName}</Typography>
                        <FormSelect
                            name={`${namePrefix}.${index}.role` as Path<TFieldValues>}
                            label="Role"
                            required
                            control={control}
                            options={rowRoleOptions}
                            value={item.role}
                            onChange={(e) => handleRoleChange(index, (e.target as HTMLInputElement).value)}
                        />
                        <IconButton onClick={() => handleRemove(item.id)} aria-label="Remove">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                );
            })}
        </Stack>
        </>
    );
}