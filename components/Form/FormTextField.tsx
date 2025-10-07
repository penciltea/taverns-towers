"use client";

import { JSX } from "react";
import { IconButton, InputAdornment, TextField, TextFieldProps, Tooltip } from "@mui/material";
import { FieldError, UseFormRegisterReturn, Merge, FieldErrorsImpl } from "react-hook-form";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
      slotProps={{ 
        inputLabel: { shrink: true },
        input: tooltip
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={tooltip} arrow>
                    <IconButton size="small" edge="end">
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }
          : undefined,
       }}
      {...rest}
    />
  );
};

export default FormTextField;
