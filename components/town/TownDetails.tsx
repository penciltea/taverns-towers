import { Box, Typography, List, ListItem, Button } from "@mui/material";

interface TownDetailsProps {
  town: {
    name: string;
    population: string;
    leadership: string;
    wealth: string;
  };
}

export default function TownDetails({ town }: TownDetailsProps) {
  return (
    <Box>
      <Typography variant="h5">Details</Typography>
      <List sx={{ listStyleType: "disc", listStylePosition: "inside" }}>
        {Object.entries(town).map(([key, value]) => (
          <ListItem key={key} sx={{ display: "list-item" }}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </ListItem>
        ))}
      </List>
      <Button variant="outlined">Additional Details</Button>
    </Box>
  );
}