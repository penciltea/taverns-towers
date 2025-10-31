'use client';

import { useState, useId, JSX } from 'react';
import { Box, Checkbox, FormControl, FormHelperText, InputLabel, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface Role {
  label: string;
  value: string;
}

interface AssignedItem {
  identifier?: string;
  userId?: string;
  roles: string[];
}

interface FormRoleAssignmentInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  roles: Role[];
  itemLabel?: string; // e.g., "Player", "Editor"
  fieldError?: { message?: string };
  required?: boolean;
  tooltip?: string | JSX.Element;
  placeholder?: string;
  disabled?: boolean;
}

export default function FormRoleAssignmentInput<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  roles,
  itemLabel = 'Item',
  fieldError,
  required = false,
  tooltip,
  placeholder = 'Type name and press Enter…',
  disabled = false,
}: FormRoleAssignmentInputProps<TFieldValues>) {
  const id = useId();
  const [inputValue, setInputValue] = useState('');

  return (
    <FormControl fullWidth margin="normal" error={!!fieldError} required={required}>
      <InputLabel shrink htmlFor={`${id}-input`}>
        {label}
      </InputLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const currentItems = (field.value as AssignedItem[] | undefined) ?? [];

          const addItem = () => {
            const trimmed = inputValue.trim();
            if (trimmed && !currentItems.some((item) => item.identifier === trimmed)) {
              field.onChange([...currentItems, { identifier: trimmed, roles: [] }]);
            }
          };

          const removeItem = (idOrIdentifier: string) => {
            field.onChange(currentItems.filter((item) => (item.userId ?? item.identifier) !== idOrIdentifier));
          };

          const toggleRole = (idOrIdentifier: string, roleValue: string) => {
            const updated = currentItems.map((item) =>
              (item.userId ?? item.identifier) === idOrIdentifier
                ? { ...item, roles: item.roles.includes(roleValue)
                    ? item.roles.filter(r => r !== roleValue)
                    : [...item.roles, roleValue] }
                : item
            );
            field.onChange(updated);
          };

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
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
                fullWidth
              />
              
              {tooltip && (
                <Typography variant="caption" color="text.secondary">
                  {tooltip}
                </Typography>
              )}

              {currentItems.length > 0 && (
                <Box mt={2} sx={{ overflowX: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} scope="col">{itemLabel}</TableCell>
                        {roles.map((role) => (
                          <TableCell key={role.value} align="center" sx={{ fontWeight: 'bold' }} scope="col">
                            {role.label}
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map((item) => {
                        const key = item.userId ?? item.identifier ?? Math.random().toString();
                        return (
                        <TableRow key={key}>
                          <TableCell scope="col">{item.identifier ?? item.userId}</TableCell>
                          {roles.map((role) => (
                            <TableCell key={`${item.identifier}-${role.value}`} align="center">
                              <Checkbox
                                size="small"
                                checked={item.roles.includes(role.value)}
                                onChange={() => toggleRole(item.identifier ? item.identifier : "", role.value)}
                                slotProps={{ 
                                    input: {
                                        'aria-label': `${role.label} role for ${item.identifier}`,
                                    }
                                }}
                              />
                            </TableCell>
                          ))}
                          <TableCell align="center">
                            <Tooltip title={`Remove ${itemLabel.toLowerCase()}`}>
                              <IconButton
                                size="small"
                                onClick={() => removeItem(key)}
                                aria-label={`Remove ${itemLabel.toLowerCase()} ${item.identifier}`}
                                color="error"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </>
          );
        }}
      />

      {fieldError?.message && <FormHelperText>{fieldError.message}</FormHelperText>}
    </FormControl>
  );
}
