'use client';

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, InputLabel, MenuItem, Select, FormHelperText, FormControl, Typography} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { LOCATION_CATEGORIES } from "@/constants/sightOptions";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import { useUIStore } from "@/store/uiStore";

export default function SightTypeDialog({ open, onClose }: DialogProps) {
  const [type, setType] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const params = useParams();
  const settlementId = params.id as string;
  const { closeDialog } = useUIStore();

  const handleManualCreation = () => {
    if (!type) {
      setError(true);
      return;
    }
    setError(false);
    router.push(`/settlements/${settlementId}/sights/new/?type=${type}`);
    closeDialog();
  }

  const handleGeneration = () => {
    if (!type) {
      setError(true);
      return;
    }
    setError(false);
    router.push(`/settlements/${settlementId}/sights/generate/?type=${type}`);
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a Sight</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          First, choose the type of sight you'd like to create. Then, decide if you'd like full control or get a little help from arcane forces.
        </Typography>

        <FormControl fullWidth error={error} sx={{ mt: 1 }}>
          
          <InputLabel id="sight-type-label">Sight Type</InputLabel>
          <Select
            labelId="sight-type-label"
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Sight Type"
          >
            {LOCATION_CATEGORIES.map((sight, index) => (
              <MenuItem key={index} value={sight.value}>
                {sight.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>Please select a sight type.</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleManualCreation}> create manually </Button>
        <Button color="primary" variant="contained" onClick={handleGeneration}> Generate with magic </Button>
      </DialogActions>
    </Dialog>
  );
}
