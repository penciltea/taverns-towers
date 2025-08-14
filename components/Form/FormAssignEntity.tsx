"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Box, Chip, Typography } from "@mui/material";

interface AssignEntityFieldProps<V, D> {
  name: string;
  label?: string;
  dialogComponent: React.ComponentType<{
    open: boolean;
    onClose: () => void;
    selected: D[];
    onConfirm: (items: D[]) => void;
  }>;
  initialSelected?: V[];
  getLabel: (item: D) => string;
  mapDialogToFormValue?: (item: D) => V; // optional mapping
}

export default function FormAssignEntityField<V, D>({
  name,
  label,
  dialogComponent: DialogComponent,
  initialSelected = [],
  getLabel,
  mapDialogToFormValue = (item: any) => item as V, // default identity
}: AssignEntityFieldProps<V, D>) {
  const { watch, setValue } = useFormContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const selectedItems: V[] = watch(name) || initialSelected;

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
        {selectedItems.length > 0 ? (
          selectedItems.map((item, idx) => (
            <Chip key={idx} label={getLabel(item as unknown as D)} size="small" />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No {label ?? "items"} assigned
          </Typography>
        )}
      </Box>
      <Button variant="outlined" onClick={() => setDialogOpen(true)}>
        {selectedItems.length ? `Change ${label ?? "Items"}` : `Assign ${label ?? "Items"}`}
      </Button>

      <DialogComponent
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selected={selectedItems as unknown as D[]}
        onConfirm={(items: D[]) => {
          setValue(name, items.map(mapDialogToFormValue), { shouldValidate: true });
          setDialogOpen(false);
        }}
      />
    </Box>
  );
}