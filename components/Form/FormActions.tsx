import { Box, Button, CircularProgress } from "@mui/material";


type FormActionProps = {
  mode: "add" | "edit" | null;
  entityName: string;
  isSubmitting: boolean;
  onCancel?: () => void; // Allows overriding default behavior
};

export default function FormActions({ mode, entityName, isSubmitting, onCancel }: FormActionProps) {
  return (
    <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between' }}>
      
      <Button
        type="button"
        variant="outlined"
        sx={{ mt: 3, ml: 3 }}
        size="small"
        
        onClick={onCancel || (() => history.back())}
      >
        cancel
      </Button>

      <Button 
        type="submit" 
        variant="contained" 
        disabled={isSubmitting}
        sx={{ mt: 3 }} 
        size="large"
      >
        {isSubmitting ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
            Saving...
          </>
        ) : (
          `${mode === "edit" ? "Update" : "Create"} ${entityName}`
        )}
      </Button>
    </Box>
  );
}
