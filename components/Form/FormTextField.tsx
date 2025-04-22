"use client";

import { TextField, TextFieldProps } from "@mui/material";
import { FieldError, UseFormRegisterReturn, Merge, FieldErrorsImpl } from "react-hook-form";

interface FormTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label: string;
  registration: UseFormRegisterReturn;
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const FormTextField = ({
  name,
  label,
  registration,
  fieldError,
  required = false,
  multiline = false,
  rows = 4,
  ...rest
}: FormTextFieldProps) => {
  // Ensure that fieldError.message is a string, or use an empty string if undefined
  const errorMessage = typeof fieldError?.message === "string" ? fieldError.message : "";

  return (
    <TextField
      fullWidth
      label={label}
      {...registration}
      error={!!fieldError}
      helperText={errorMessage} // Safely pass a string to helperText
      margin="normal"
      required={required}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      {...rest}
    />
  );
};

export default FormTextField;
