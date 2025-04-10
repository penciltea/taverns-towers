import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { Town } from "@/interfaces/town.interface";

export default function TownDetails({ town }: { town: Town }) {

  if (!town) {
    return <Typography>Loading town details...</Typography>;
  }

  return (
    <Box sx={{marginTop: 1}}>
      <Typography variant="h5">Details</Typography>
      <List sx={{ listStyleType: "disc", listStylePosition: "inside" }}>
        <ListItem sx={{ display: "list-item" }}><strong>Size: </strong>{town.size || 'N/A'}</ListItem>
        <ListItem sx={{ display: "list-item" }}><strong>Wealth: </strong>{town.wealth || 'N/A'}</ListItem>
        <ListItem sx={{ display: "list-item" }}><strong>Leader(s): </strong>{town.leader || 'N/A'}</ListItem>
      </List>
      <Button variant="outlined">Additional Details</Button>
    </Box>
  );
}