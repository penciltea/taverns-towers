'use client';

import { useState, useId, JSX } from 'react';
import { Box, Chip, FormControl, FormHelperText, InputLabel, TextField, Typography } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Close as CloseIcon } from '@mui/icons-material';

export interface Option {
  value: string;
  label: string;
}

interface FormChipInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  fieldError?: { message?: string };
  required?: boolean;
  tooltip?: string | JSX.Element;
  placeholder?: string;
  disabled?: boolean;
}

export default function FormChipInput<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  fieldError,
  required = false,
  tooltip,
  placeholder = 'Type and press Enter…',
  disabled = false,
}: FormChipInputProps<TFieldValues>) {
  const [inputValue, setInputValue] = useState('');
  const id = useId();

  return (
    <FormControl fullWidth margin="normal" error={!!fieldError} required={required}>
      <InputLabel shrink htmlFor={`${id}-input`}>
        {label}
      </InputLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
            const addChip = () => {
                const trimmed = inputValue.trim();
                const currentValues = (field.value as string[] | undefined) ?? [];

                if (trimmed && !currentValues.includes(trimmed)) {
                    field.onChange([...currentValues, trimmed]);
                }
                setInputValue('');
            };

            const removeChip = (chipToDelete: string) => {
                const currentValues = (field.value as string[] | undefined) ?? [];
                field.onChange(currentValues.filter((val) => val !== chipToDelete));
            };

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addChip();
            }
          };

          return (
            <>
              <TextField
                id={`${id}-input`}
                variant="outlined"
                size="small"
                placeholder={placeholder}
                value={inputValue}
                disabled={disabled}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={field.onBlur}
                fullWidth
              />

              {/* Chips below input */}
              {Array.isArray(field.value) && field.value.length > 0 && (
                <Box
                  mt={1}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.5,
                  }}
                >
                  {field.value.map((chip: string) => (
                    <Chip
                      key={chip}
                      label={chip}
                      onDelete={() => removeChip(chip)}
                      deleteIcon={<CloseIcon />}
                      size="small"
                    />
                  ))}
                </Box>
              )}
            </>
          );
        }}
      />

      {tooltip && (
        <Typography variant="caption" color="text.secondary">
          {tooltip}
        </Typography>
      )}

      {fieldError?.message && (
        <FormHelperText>{fieldError.message}</FormHelperText>
      )}
    </FormControl>
  );
}
