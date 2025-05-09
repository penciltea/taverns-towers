import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { Settlement } from "@/interfaces/settlement.interface";
import { useUIStore } from "@/store/uiStore";
import SettlementDetailsDialog from "./SettlementDetailsDialog";
import InfoListItem from "@/components/Common/InfoListItem";

export default function SettlementDetails({ settlement }: { settlement: Settlement }) {
  const { openDialog, closeDialog } = useUIStore();

  const fields = [
    { label: "Size", value: settlement.size },
    { label: "Tags", value: settlement.tags?.length ? settlement.tags.join(", ") : "N/A" },
    { label: "Terrain", value: settlement.terrain?.length ? settlement.terrain.join(", ") : "N/A" },
    { label: "Climate", value: settlement.climate },
    { label: "Magic Use/Level", value: settlement.magic },
    { label: "Wealth", value: settlement.wealth },
    { label: "Leader(s)", value: settlement.leader },
  ];

  if (!settlement) {
    return <Typography>Loading settlement details...</Typography>;
  }

  return (
    <>
      <Box sx={{marginTop: 1}}>
        <Typography variant="h4" component="h2">Details</Typography>
        
        <List>
          {fields.map((field) => (
            <InfoListItem key={ field.label } label={ field.label } value={ field.value } />
          ))}
        </List>
        <Button variant="outlined" onClick={() => useUIStore.getState().setOpenDialog('SettlementDetailsDialog')}>Additional Details</Button>
      </Box>

      {openDialog === 'SettlementDetailsDialog' && (
        <SettlementDetailsDialog open onClose={closeDialog} settlement={settlement} />
      )}
    </>
  );
}