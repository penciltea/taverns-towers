import { Box, Typography, List, Button } from "@mui/material";
import { Settlement } from "@/interfaces/settlement.interface";
import { useUIStore } from "@/store/uiStore";
import InfoListItem from "@/components/Common/InfoListItem";

export default function SettlementDetails({ settlement }: { settlement: Settlement }) {
  const { setOpenDialog, openDialog, closeDialog } = useUIStore();


  const fields = [
    { label: "Size", value: settlement.size },
    { label: "Tags", value: settlement.tags?.length ? settlement.tags.join(", ") : "N/A" },
    { label: "Terrain", value: settlement.terrain?.length ? settlement.terrain.join(", ") : "N/A" },
    { label: "Climate", value: settlement.climate },
    { label: "Magic Use/Level", value: settlement.magic },
    { label: "Wealth", value: settlement.wealth }
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
        <Button variant="outlined" color="secondary" onClick={() => setOpenDialog('SettlementDetailsDialog', { settlement: settlement })}>Additional Details</Button>
      </Box>
    </>
  );
}