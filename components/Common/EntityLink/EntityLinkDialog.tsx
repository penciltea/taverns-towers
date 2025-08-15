import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Stack, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { ReactElement } from "react";
import { createPortal } from "react-dom";

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

        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {localSelected.map((entity) => (
            <Chip key={getId(entity)} label={getLabel(entity)} onDelete={() => handleRemove(getId(entity))} />
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