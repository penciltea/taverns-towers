"use client";

import { FormControl, InputLabel, MenuItem, Select, SelectProps, FormHelperText, ListSubheader} from "@mui/material";
import { Control, Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { useId } from "react";

export interface Option {
  label: string;
  value: string;
}

export interface OptionGroup {
  label: string;
  options: ReadonlyArray<Option>;
}

export interface FormSelectProps extends Omit<SelectProps, "name"> {
  name: string;
  label: string;
  control?: Control<any>;
  options: ReadonlyArray<Option | OptionGroup>;
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

  function isGroupedOption(option: Option | OptionGroup): option is OptionGroup {
    return typeof option === "object" && "options" in option;
  }

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
            {options.map((opt) =>
              isGroupedOption(opt) ? (
                [
                  <ListSubheader key={`group-${opt.label}`}>{opt.label}</ListSubheader>,
                  ...opt.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )),
                ]
              ) : (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              )
            )}
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
