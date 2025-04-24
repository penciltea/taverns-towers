import { Box, Button } from "@mui/material";

type FormActionProps = {
  mode: "add" | "edit" | null;
  entityName: string;
  onCancel?: () => void; // Allows overriding default behavior
};

export default function FormActions({ mode, entityName, onCancel }: FormActionProps) {
  return (
    <Box sx={{ my: 2 }}>
      <Button type="submit" variant="contained" sx={{ mt: 3 }} size="large">
        {mode === "edit" ? "Update" : "Create"} {entityName}
      </Button>
      <Button
        type="button"
        variant="outlined"
        sx={{ mt: 3, ml: 3 }}
        size="small"
        onClick={onCancel || (() => history.back())}
      >
        cancel
      </Button>
    </Box>
  );
}
