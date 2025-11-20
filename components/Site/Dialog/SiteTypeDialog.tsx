'use client';

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, InputLabel, MenuItem, Select, FormHelperText, FormControl, Typography} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { SITE_CATEGORIES } from "@/constants/site/site.options";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import { useUIStore } from "@/store/uiStore";
import { useOwnedSettlementsQuery } from "@/hooks/settlement/settlement.query";
import { DefaultSettlementQueryParams } from "@/interfaces/settlement.interface";
import { useAuthStore } from "@/store/authStore";

export default function SiteTypeDialog({ open, onClose, dialogMode, defaultSettlementId }: DialogProps) {
  const [siteType, setSiteType] = useState("");
  const [selectedSettlement, setSelectedSettlement] = useState(defaultSettlementId || "");
  const [error, setError] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { closeDialog } = useUIStore();
  const { user } = useAuthStore();
  const [settlementParams] = useState(DefaultSettlementQueryParams);
  const { data } = useOwnedSettlementsQuery(settlementParams, {
    isEnabled: !!user
  });

  const handleCreateSite = () => {
    let settlementToUse = selectedSettlement;

    if (dialogMode === 'direct') {
      if (!siteType) {
        setError(true);
        return;
      }
      if(selectedSettlement === 'wilderness'){
        settlementToUse = selectedSettlement
      } else {
        settlementToUse = params.id as string;
      }
    }

    if (dialogMode === 'global') {
      if (!siteType) {
        setError(true);
        return;
      }

      if (!user) {
        settlementToUse = 'wilderness'; // default for anonymous
      } else if (!selectedSettlement) {
        setError(true);
        return;
      }
    }

    setError(false);
    router.push(`/settlements/${settlementToUse}/sites/new/?type=${siteType}`);
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Forge a Site</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom> Decide what kind of site you would like to forge before getting started! </Typography>

        {dialogMode === 'global' && user && (
          <FormControl fullWidth error={error} sx={{ mt: 1 }}>
            <InputLabel id="settlement-location-label">Create Site In...</InputLabel>
            <Select
              labelId="settlement-location-label"
              value={selectedSettlement}
              onChange={(e) => setSelectedSettlement(e.target.value)}
              label="Create Site In..."
            >
              {data && data.settlements.map((settlement, index) => (
                <MenuItem key={index} value={settlement._id}>
                  {settlement.name}
                </MenuItem>
              ))}
              <MenuItem key={data && data.settlements.length + 1} value={'wilderness'}> Wilderness / No settlement </MenuItem>
            </Select>
            {error && <FormHelperText>Please select where this site is being saved to.</FormHelperText>}
          </FormControl>
        )}

        { dialogMode === 'global' && !user && (
          <>
            <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mt: 1 }}>To choose a settlement, please log in.</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>Otherwise, your site will be created in the wilderness.</Typography>
          </>
        )}

        <FormControl fullWidth error={error} sx={{ mt: 1 }}>
          <InputLabel id="site-type-label">Site Type</InputLabel>
          <Select
            labelId="site-type-label"
            value={siteType}
            onChange={(e) => setSiteType(e.target.value)}
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
