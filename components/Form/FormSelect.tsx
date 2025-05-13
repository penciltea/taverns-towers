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
import { useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<SelectProps, "name"> {
  name: string;
  label: string;
  control?: Control<any>;
  options: Option[];
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
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
  const id = useId();
  const selectId = `${id}-${name}`;
  const labelId = `${selectId}-label`;
  const errorId = `${selectId}-error`;
  const hasError = !!fieldError;
  const errorMessage = typeof fieldError?.message === "string" ? fieldError.message : "";

  return (
    <FormControl fullWidth margin="normal" error={hasError} required={required}>
      <InputLabel id={labelId} htmlFor={selectId} shrink>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            id={selectId}
            labelId={labelId}
            aria-describedby={hasError ? errorId : undefined}
            value={field.value ?? ""}
            label={label}
            {...rest}
          >
            <MenuItem value="" disabled>
              <em>Select one…</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {hasError && (
        <FormHelperText id={errorId}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelect;
