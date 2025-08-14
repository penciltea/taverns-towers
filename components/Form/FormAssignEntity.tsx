"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Box, Chip, Typography } from "@mui/material";

interface AssignEntityFieldProps<TFormValue, TDialogItem> {
  name: string;
  label?: string;
  dialogComponent: React.ComponentType<{
    open: boolean;
    onClose: () => void;
    selected: TDialogItem[];
    onConfirm: (items: TDialogItem[]) => void;
  }>;
  initialSelected?: TFormValue[];
  getLabel: (item: TDialogItem) => string; // always receives dialog item
  mapDialogToFormValue: (item: TDialogItem) => TFormValue; // how to store in form
  mapFormValueToDialogItem?: (value: TFormValue) => TDialogItem | undefined; // optional: reverse mapping
}

export default function FormAssignEntityField<TFormValue, TDialogItem>({
  name,
  label,
  dialogComponent: DialogComponent,
  initialSelected = [],
  getLabel,
  mapDialogToFormValue,
  mapFormValueToDialogItem,
}: AssignEntityFieldProps<TFormValue, TDialogItem>) {
  const { watch, setValue } = useFormContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const formValues: TFormValue[] = watch(name) || initialSelected;

  // Map form values to dialog items for label display
  const selectedDialogItems: TDialogItem[] = formValues
    .map((val) => mapFormValueToDialogItem?.(val))
    .filter((item): item is TDialogItem => !!item); // remove undefined

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
        {selectedDialogItems.length > 0 ? (
          selectedDialogItems.map((item, idx) => (
            <Chip key={idx} label={getLabel(item)} size="small" />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No {label ?? "items"} assigned
          </Typography>
        )}
      </Box>

      <Button variant="outlined" onClick={() => setDialogOpen(true)}>
        {selectedDialogItems.length
          ? `Change ${label ?? "Items"}`
          : `Assign ${label ?? "Items"}`}
      </Button>

      <DialogComponent
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selected={selectedDialogItems}
        onConfirm={(items: TDialogItem[]) => {
          const mappedValues = items.map(mapDialogToFormValue);
          setValue(name, mappedValues, { shouldValidate: true });
          setDialogOpen(false);
        }}
      />
    </Box>
  );
}
