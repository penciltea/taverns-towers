'use client';

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";

interface EntityLinkDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onConfirm: (selected: T[]) => void;
  entities: T[];
  selected: T[];
  getId: (entity: T) => string;
  getLabel: (entity: T) => string;
  entityLabel: string;
  allowMultiple?: boolean;
}

export default function EntityLinkDialog<T>({
  open,
  onClose,
  onConfirm,
  entities,
  selected,
  getId,
  getLabel,
  entityLabel,
  allowMultiple = true,
}: EntityLinkDialogProps<T>) {
  const [localSelected, setLocalSelected] = useState<T[]>(selected);

  const handleSelect = (value: T | null) => {
    if (!value) return;
    if (allowMultiple) {
      if (!localSelected.some((e) => getId(e) === getId(value))) {
        setLocalSelected([...localSelected, value]);
      }
    } else {
      setLocalSelected([value]);
    }
  };

  const handleRemove = (id: string) => {
    setLocalSelected(localSelected.filter((e) => getId(e) !== id));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Assign {entityLabel}</DialogTitle>
      <DialogContent>
        <Autocomplete<T>
          options={entities}
          value={null}
          getOptionLabel={(option) => getLabel(option)}
          isOptionEqualToValue={(opt, val) => getId(opt) === getId(val)}
          onChange={(_, value) => handleSelect(value)}
          renderInput={(params) => (
            <TextField {...params} label={`Select ${entityLabel}`} variant="outlined" />
          )}
        />

        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap>
          {localSelected.map((entity) => (
            <Chip key={getId(entity)} label={getLabel(entity)} onDelete={() => handleRemove(getId(entity))} sx={{ my: 0.25 }} />
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm(localSelected);
            onClose();
          }}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}