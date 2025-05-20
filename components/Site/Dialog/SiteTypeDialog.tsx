'use client';

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, InputLabel, MenuItem, Select, FormHelperText, FormControl, Typography} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import { useUIStore } from "@/store/uiStore";

export default function SiteTypeDialog({ open, onClose }: DialogProps) {
  const [type, setType] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const params = useParams();
  const settlementId = params.id as string;
  const { closeDialog } = useUIStore();

  const handleCreateSite = () => {
    if (!type) {
      setError(true);
      return;
    }
    setError(false);
    router.push(`/settlements/${settlementId}/sites/new/?type=${type}`);
    closeDialog();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Forge a Site</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom> Decide what kind of site you would like to forge before getting started! </Typography>

        <FormControl fullWidth error={error} sx={{ mt: 1 }}>
          
          <InputLabel id="site-type-label">Site Type</InputLabel>
          <Select
            labelId="site-type-label"
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Site Type"
          >
            {SITE_CATEGORIES.map((site, index) => (
              <MenuItem key={index} value={site.value}>
                {site.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>Please select a site type.</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>
         <Button onClick={onClose}> Cancel </Button>
        <Button color="primary" variant="contained" onClick={handleCreateSite}> Begin Site Forging </Button>
      </DialogActions>
    </Dialog>
  );
}
