"use client";

import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectProps, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useState, useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface FormChipSelectProps extends Omit<SelectProps, "name"> {
  name: string;
  label: string;
  control?: Control<any>;
  options: Option[];
  fieldError?: { message?: string };
  required?: boolean;
  allowCustomValues?: boolean;
  disabledOptions?: string[];
}

const FormChipSelect = ({
  name,
  label,
  control,
  options,
  fieldError,
  required = false,
  allowCustomValues = false,
  disabledOptions = [],
  ...rest
}: FormChipSelectProps) => {
  const [customInput, setCustomInput] = useState("");
  const id = useId();
  const isOptionDisabled = (value: string) => disabledOptions.includes(value);

  return (
    <FormControl fullWidth margin="normal" error={!!fieldError} required={required}>
      <InputLabel id={`${id}-label`} shrink>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleAddCustom = () => {
            const trimmed = customInput.trim();
            if (
              trimmed &&
              !field.value.includes(trimmed) &&
              !options.some((opt) => opt.value === trimmed)
            ) {
              field.onChange([...field.value, trimmed]);
            }
            setCustomInput("");
          };

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCustom();
            }
          };

          return (
            <>
              <Select
                {...field}
                multiple
                id={`${id}-select`}
                name={name}
                labelId={`${id}-label`}
                input={<OutlinedInput label={label} />
              }
                renderValue={(selected) => {
                    const selectedValues = selected as string[];
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selectedValues.map((value) => {
                          const option = options.find((opt) => opt.value === value);
                          return <Chip key={value} label={option?.label || value} />;
                        })}
                      </Box>
                    );
                  }}
                {...rest}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    disabled={isOptionDisabled(option.value)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              {allowCustomValues && (
                <Box mt={1} display="flex" gap={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Add custom tag"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </Box>
              )}
            </>
          );
        }}
      />
      {fieldError?.message && <FormHelperText>{fieldError?.message}</FormHelperText>}
    </FormControl>
  );
};

export default FormChipSelect;
