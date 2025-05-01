'use client';

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, InputLabel, MenuItem, Select, FormHelperText, FormControl} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { LOCATION_CATEGORIES } from "@/constants/locationOptions";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import { useUIStore } from "@/store/uiStore";

export default function LocationTypeDialog({ open, onClose }: DialogProps) {
  const [type, setType] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const params = useParams();
  const settlementId = params.id as string;
  const { closeDialog } = useUIStore();

  const handleConfirm = () => {
    if (!type) {
      setError(true);
      return;
    }
    setError(false);
    router.push(`/settlements/${settlementId}/locations/new/?type=${type}`); // or whatever route you use
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a Location</DialogTitle>
      <DialogContent>
        <FormControl fullWidth error={error} sx={{ mt: 1 }}>
          <InputLabel id="location-type-label">Location Type</InputLabel>
          <Select
            labelId="location-type-label"
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Location Type"
          >
            {LOCATION_CATEGORIES.map((location, index) => (
              <MenuItem key={index} value={location.value}>
                {location.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>Please select a location type.</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
