"use client";

import React, { useState, useId } from "react";
import { Box, Chip, FormControl, FormHelperText, InputLabel, ListSubheader, MenuItem, OutlinedInput, Select, SelectProps, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface OptionGroup {
  label: string;
  options: ReadonlyArray<Option>;
}

interface FormChipSelectProps extends Omit<SelectProps, "name"> {
  name: string;
  label: string;
  control?: Control<any>;
  options: ReadonlyArray<Option | OptionGroup>;
  fieldError?: { message?: string };
  required?: boolean;
  allowCustomValues?: boolean;
  disabledOptions?: string[];
}

const isOptionGroup = (option: Option | OptionGroup): option is OptionGroup =>
  typeof option === "object" && "options" in option;

const flattenOptions = (options: ReadonlyArray<Option | OptionGroup>): Option[] =>
  options.flatMap((opt) => (isOptionGroup(opt) ? opt.options : [opt]));

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
  const flatOptions = flattenOptions(options);

  const isOptionDisabled = (value: string) => disabledOptions.includes(value);

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
            field.onChange(event.target.value);
          };

          const handleAddCustom = () => {
            const trimmed = customInput.trim();

            if (
              trimmed &&
              !field.value?.includes(trimmed) &&
              !flatOptions.some((opt) => opt.value === trimmed)
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
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((value) => {
                      const option = flatOptions.find((opt) => opt.value === value);
                      return <Chip key={value} label={option?.label || value} />;
                    })}
                  </Box>
                )}
                {...rest}
              >
                <MenuItem disabled value="">
                  <em>Select one or more…</em>
                </MenuItem>

                {options.map((opt) =>
                  isOptionGroup(opt) ? (
                    [
                      <ListSubheader key={`subheader-${opt.label}`}>{opt.label}</ListSubheader>,
                      ...opt.options.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          disabled={isOptionDisabled(option.value)}
                        >
                          {option.label}
                        </MenuItem>
                      )),
                    ]
                  ) : (
                    <MenuItem
                      key={opt.value}
                      value={opt.value}
                      disabled={isOptionDisabled(opt.value)}
                    >
                      {opt.label}
                    </MenuItem>
                  )
                )}
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
