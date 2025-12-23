"use client";

import { JSX, useId } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectProps, FormHelperText, ListSubheader, Typography} from "@mui/material";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import { Option, OptionGroup } from "./FormChipSelect";




export interface FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> extends Omit<SelectProps, "name"> {
  name: TName;
  label: string;
  control?: Control<TFieldValues>;
  options: ReadonlyArray<Option | OptionGroup>;
  fieldError?: FieldError;
  required?: boolean;
  tooltip?: string | JSX.Element;
}

function FormSelect<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  name,
  label,
  control,
  options,
  fieldError,
  required = false,
  tooltip,
  ...rest
}: FormSelectProps<TFieldValues, TName>) {
  const id = useId();
  const selectId = `${id}-${name}`;
  const labelId = `${selectId}-label`;
  const errorId = `${selectId}-error`;
  const hasError = !!fieldError;
  const errorMessage =
    typeof fieldError?.message === "string" ? fieldError.message : "";

  function isGroupedOption(option: Option | OptionGroup): option is OptionGroup {
    return "options" in option;
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
                  <ListSubheader key={`group-${opt.label}`}>
                    {opt.label}
                  </ListSubheader>,
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
      {tooltip && (
        <Typography variant="caption">
          {tooltip}
        </Typography>
      )}
      {hasError && (
        <FormHelperText id={errorId}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
}

export default FormSelect;