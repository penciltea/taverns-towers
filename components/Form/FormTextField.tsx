"use client";

import { TextField, TextFieldProps } from "@mui/material";
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
}

const FormTextField = <TFieldValues extends FieldValues>({
  label,
  registration,
  fieldError,
  required = false,
  multiline = false,
  rows = 4,
  ...rest
}: FormTextFieldProps<TFieldValues>) => {
  const errorMessage = typeof fieldError?.message === "string" ? fieldError.message : "";

  return (
    <TextField
      fullWidth
      label={label}
      {...registration}
      error={!!fieldError}
      helperText={errorMessage}
      margin="normal"
      required={required}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      slotProps={{ inputLabel: { shrink: true } }}
      {...rest}
    />
  );
};

export default FormTextField;
