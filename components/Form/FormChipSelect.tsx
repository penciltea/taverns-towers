'use client'

import React from "react";
import { Box, Chip, FormControl, FormHelperText, InputLabel, ListSubheader, MenuItem, OutlinedInput, Select, SelectProps, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useState, useId } from "react";


interface Option {
  value: string;
  label: string;
}

interface OptionGroup {
  label: string;
  options: Option[];
}

interface FormChipSelectProps extends Omit<SelectProps, "name"> {
  name: string;
  label: string;
  control?: Control<any>;
  options: Option[] | OptionGroup[];
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
  const isGrouped = Array.isArray(options) && options.some((opt) => "options" in opt);

  const flattenOptions = (): Option[] =>
    options.flatMap((opt) => ("options" in opt ? opt.options : [opt]));

  return (
    <FormControl fullWidth margin="normal" error={!!fieldError} required={required}>
      <InputLabel id={`${id}-label`} shrink>
        {label}
      </InputLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleSelectChange = (event: any) => {
            const selected = event.target.value;
            field.onChange(selected);
          };

          const handleAddCustom = () => {
            const trimmed = customInput.trim();
            const allOptions = flattenOptions();

            if (
              trimmed &&
              !field.value?.includes(trimmed) &&
              !allOptions.some((opt) => opt.value === trimmed)
            ) {
              field.onChange([...(field.value ?? []), trimmed]);
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
                multiple
                id={`${id}-select`}
                name={field.name}
                labelId={`${id}-label`}
                input={<OutlinedInput label={label} />}
                value={field.value ?? []}
                onChange={handleSelectChange}
                onBlur={field.onBlur}
                ref={field.ref}
                renderValue={(selected) => {
                  const selectedValues = selected as string[];
                  const allOptions = flattenOptions();

                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedValues.map((value) => {
                        const option = allOptions.find((opt) => opt.value === value);
                        return <Chip key={value} label={option?.label || value} />;
                      })}
                    </Box>
                  );
                }}
                {...rest}
              >
                {isGrouped
                  ? (options as OptionGroup[]).flatMap((group) => [
                      <ListSubheader key={`subheader-${group.label}`}>{group.label}</ListSubheader>,
                      ...group.options.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          disabled={isOptionDisabled(option.value)}
                        >
                          {option.label}
                        </MenuItem>
                      ))
                    ])
                  : (options as Option[]).map((option) => (
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
                    placeholder="Add custom value"
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

      {fieldError?.message && (
        <FormHelperText>{fieldError.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormChipSelect;