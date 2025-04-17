"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  FormHelperText,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<SelectProps, "name"> {
  name: string;
  label: string;
  control: Control<any>;
  options: Option[];
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>; // <-- updated here
  required?: boolean;
}

const FormSelect = ({
  name,
  label,
  control,
  options,
  fieldError,
  required = false,
  ...rest
}: FormSelectProps) => {
  // Safely extract the error message
  const errorMessage = typeof fieldError?.message === "string" ? fieldError.message : "";

  return (
    <FormControl fullWidth margin="normal" error={!!fieldError} required={required}>
      <InputLabel>{required ? `${label} *` : label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value ?? ""}
            label={label}
            {...rest}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {fieldError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default FormSelect;
