"use client";

import { JSX } from "react";
import { FormControl, FormHelperText, TextField, TextFieldProps, Typography } from "@mui/material";
import { FieldError, UseFormRegisterReturn, Merge, FieldErrorsImpl } from "react-hook-form";

import { FieldValues } from "react-hook-form";

interface FormTextFieldProps<TFieldValues extends FieldValues>
  extends Omit<TextFieldProps, "name"> {
  label: string;
  registration: UseFormRegisterReturn;
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<TFieldValues>> | undefined;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  tooltip?: string | JSX.Element;
}

const FormTextField = <TFieldValues extends FieldValues>({
  label,
  registration,
  fieldError,
  required = false,
  multiline = false,
  rows = 4,
  tooltip,
  ...rest
}: FormTextFieldProps<TFieldValues>) => {
  const hasError = !!fieldError;

  const errorMessage = typeof fieldError?.message === "string" ? fieldError.message : "";

  return (
    <FormControl fullWidth margin="normal" error={hasError} required={required}>
      <TextField
        label={label}
        {...registration}
        error={!!fieldError}
        required={required}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        slotProps={{ inputLabel: { shrink: true } }}
        {...rest}
      />
      
      {tooltip && (
        <Typography variant="caption" sx={{ mt: 0.25 }}>
          {tooltip}
        </Typography>
      )}
      {hasError && (
        <FormHelperText id={`${label}-id`}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormTextField;
