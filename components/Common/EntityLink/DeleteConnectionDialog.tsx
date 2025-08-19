'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import useNpcMap from "@/hooks/npc/useNpcMap";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";

export default function DeleteConnectionDialog({
  open,
  onClose,
  onConfirm,
  deletedConnections
}: DialogProps) {
  
  const npcMap = useNpcMap();


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Connections Confirmation</DialogTitle>
      <DialogContent>
        <Typography>The following connections will be deleted when you save this data:</Typography>
        <ul>
          {deletedConnections && deletedConnections.map((conn) => {
            const baseName =
              conn.type === "npc"
                ? npcMap.get(conn.id)?.name || conn.label || conn.id
                : conn.label || conn.id;

            const formatted = conn.role
              ? `${baseName}: ${capitalizeFirstLetter(conn.role)}`
              : baseName;

            return <li key={conn.id}>{formatted}</li>;
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
