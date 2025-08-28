'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import useNpcMap from "@/hooks/npc/useNpcMap";
import useSettlementMap from "@/hooks/settlement/useSettlementMap";
import useSiteMap from "@/hooks/site/useSiteMap";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";

export default function DeleteConnectionDialog({
  open,
  onClose,
  onConfirm,
  deletedConnections
}: DialogProps) {
  
  const npcMap = useNpcMap();
  const settlementMap = useSettlementMap();
  const siteMap = useSiteMap();


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Connections Confirmation</DialogTitle>
      <DialogContent>
        <Typography>The following connections will be deleted when you save this data:</Typography>
        <ul>
          {deletedConnections?.map((conn) => {
            let baseName = "";
            if(conn.type === 'npc'){
              baseName = npcMap.get(conn.id)?.name || conn.id;
            } else if(conn.type === 'settlement'){
              baseName = settlementMap.get(conn.id)?.name || conn.id;
            } else if(conn.type === 'site'){
              baseName = siteMap.get(conn.id)?.name || conn.id;
            }
            const formattedLabel = conn.role
              ? `${baseName}: ${capitalizeFirstLetter(conn.role)}`
              : baseName;

            return <li key={conn.id}>{formattedLabel}</li>;
          })}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}> Cancel </Button>
        <Button color="error" onClick={onConfirm}> Confirm </Button>
      </DialogActions>
    </Dialog>
  );
}
