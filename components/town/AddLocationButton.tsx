import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddLocationButton() {
  return (
    <Fab
      variant="extended"
      color="primary"
      aria-label="add location"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
    >
      <AddIcon /> Add Location
    </Fab>
  );
}
