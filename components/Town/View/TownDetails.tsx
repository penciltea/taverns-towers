import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { Town } from "@/interfaces/town.interface";
import { useUIStore } from "@/store/uiStore";
import TownDetailsDialog from "./TownDetailsDialog";
import InfoListItem from "@/components/Common/InfoListItem";

export default function TownDetails({ town }: { town: Town }) {
  const { openDialog, closeDialog } = useUIStore();

  const fields = [
    { label: "Size", value: town.size },
    { label: "Tags", value: town.tags?.length ? town.tags.join(", ") : "N/A" },
    { label: "Terrain", value: town.terrain?.length ? town.terrain.join(", ") : "N/A" },
    { label: "Climate", value: town.climate },
    { label: "Magic Use/Level", value: town.magic },
    { label: "Wealth", value: town.wealth },
    { label: "Leader(s)", value: town.leader },
  ];

  if (!town) {
    return <Typography>Loading town details...</Typography>;
  }

  return (
    <>
      <Box sx={{marginTop: 1}}>
        <Typography variant="h5">Details</Typography>
        
        <List>
          {fields.map((field) => (
            <InfoListItem key={ field.label } label={ field.label } value={ field.value } />
          ))}
        </List>
        <Button variant="outlined" onClick={() => useUIStore.getState().setOpenDialog('TownDetailsDialog')}>Additional Details</Button>
      </Box>

      {openDialog === 'TownDetailsDialog' && (
        <TownDetailsDialog open onClose={closeDialog} town={town} />
      )}
    </>
  );
}