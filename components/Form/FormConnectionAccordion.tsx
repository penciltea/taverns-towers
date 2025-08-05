"use client";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, IconButton, Stack} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Option } from "@/components/Form/FormSelect";
import FormSelect from "@/components/Form/FormSelect";
import { Control } from "react-hook-form";

export type ConnectionItem = {
  id: string;
  name: string;
  role: string;
};

interface FormConnectionAccordionProps {
  label: string;
  availableOptions: { id: string; name: string }[];
  value: ConnectionItem[];
  onChange: (updated: ConnectionItem[]) => void;
  roleOptions: Option[]; // updated to use structured { label, value }
  control: Control<any>;
  namePrefix: string;
}

export function FormConnectionAccordion({
  label,
  availableOptions,
  value,
  onChange,
  roleOptions,
  control,
  namePrefix,
}: FormConnectionAccordionProps) {
  const handleAdd = (id: string) => {
    const alreadyExists = value.find((v) => v.id === id);
    if (!alreadyExists) {
      const newItem = availableOptions.find((opt) => opt.id === id);
      if (newItem) {
        onChange([...value, { id: newItem.id, name: newItem.name, role: "" }]);
      }
    }
  };

  const handleRemove = (id: string) => {
    onChange(value.filter((item) => item.id !== id));
  };

  const handleRoleChange = (index: number, newRole: string) => {
    const updated = [...value];
    updated[index].role = newRole;
    onChange(updated);
  };

  const safeValue = value ?? [];
  const selectedIds = safeValue.map((v) => v.id);

  const selectOptions: Option[] = availableOptions.map((opt) => ({
    value: opt.id,
    label: opt.name,
  }));

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box mb={2}>
          <FormSelect
            name={`${namePrefix}.selector`}
            label={`Add ${label}`}
            control={control}
            options={selectOptions.filter((opt) => !selectedIds.includes(opt.value))}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              handleAdd(value);
            }}
          />
        </Box>

        <Stack spacing={2}>
          {value.map((item, index) => (
            <Box
              key={item.id}
              display="grid"
              gridTemplateColumns="1fr 1fr auto"
              alignItems="center"
              gap={2}
            >
              <Typography>{item.name}</Typography>
              <FormSelect
                name={`${namePrefix}.${index}.role`}
                label="Role"
                control={control}
                options={roleOptions}
                value={item.role}
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  handleRoleChange(index, value);
                }}
              />
              <IconButton onClick={() => handleRemove(item.id)} aria-label="Remove">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
