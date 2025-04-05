import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TownActions() {
  return (
    <Box>
      <Button sx={{ mx: 1 }} variant="outlined" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button sx={{ mx: 1 }} variant="text" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Box>
  );
}