"use client";

import { JSX } from "react";
import { Checkbox, FormControl, FormControlLabel, FormHelperText, Typography } from "@mui/material";
import { FieldError, Merge, FieldErrorsImpl, UseFormRegisterReturn, FieldValues } from "react-hook-form";

interface FormCheckboxFieldProps<TFieldValues extends FieldValues> {
  label: string;
  registration: UseFormRegisterReturn;
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<TFieldValues>> | undefined;
  tooltip?: string | JSX.Element;
  required?: boolean;
  disabled?: boolean;
}

const FormCheckboxField = <TFieldValues extends FieldValues>({
  label,
  registration,
  fieldError,
  tooltip,
  required = false,
  disabled = false,
}: FormCheckboxFieldProps<TFieldValues>) => {
  const hasError = !!fieldError;
  const errorMessage = typeof fieldError?.message === "string" ? fieldError.message : "";

  return (
    <FormControl
      component="fieldset"
      error={hasError}
      required={required}
      disabled={disabled}
      sx={{ my: 1 }}
    >
      <FormControlLabel
        control={<Checkbox {...registration} color="primary" />}
        label={label}
      />

      {tooltip && (
        <Typography variant="caption" sx={{ ml: 4, mt: 0.25, display: "block" }}>
          {tooltip}
        </Typography>
      )}

      {hasError && (
        <FormHelperText id={`${label}-helper-text`}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormCheckboxField;
