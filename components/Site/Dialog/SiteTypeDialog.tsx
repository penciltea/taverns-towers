'use client';

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, InputLabel, MenuItem, Select, FormHelperText, FormControl, Typography} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import { useUIStore } from "@/store/uiStore";
import { useSettlementsQuery } from "@/hooks/settlement.query";
import { DefaultSettlementQueryParams } from "@/interfaces/settlement.interface";

export default function SiteTypeDialog({ open, onClose, dialogMode, defaultSettlementId }: DialogProps) {
  const [siteType, setSiteType] = useState("");
  const [selectedSettlement, setSelectedSettlement] = useState(defaultSettlementId || "");
  const [error, setError] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { closeDialog } = useUIStore();
  const [settlementParams] = useState(DefaultSettlementQueryParams);
  const { data } = useSettlementsQuery(settlementParams);

  const handleCreateSite = () => {
    if(dialogMode === 'direct'){
      if(!siteType){
        setError(true);
        return;
      }
      setSelectedSettlement(params.id as string);
      
    }

    if (dialogMode === 'global'){
      if(!siteType || !selectedSettlement) {
        setError(true);
        return;
      }
    }

    setError(false);
    router.push(`/settlements/${selectedSettlement}/sites/new/?type=${siteType}`);
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Forge a Site</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom> Decide what kind of site you would like to forge before getting started! </Typography>

        {dialogMode === 'global' && (
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
