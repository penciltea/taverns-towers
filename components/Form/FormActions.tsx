import { Button, CircularProgress, Stack } from "@mui/material";
import { useAuthStore } from "@/store/authStore";
import { isUserVerified } from "@/lib/util/isUserVerified";


type FormActionProps = {
  mode: "add" | "edit" | null;
  entityName: string;
  isSubmitting: boolean;
  onCancel?: () => void; // Allows overriding default behavior
};

export default function FormActions({ mode, entityName, isSubmitting, onCancel }: FormActionProps) {
  const user = useAuthStore(state => state.user);
  const verified = isUserVerified(user);

  const buttonText = isSubmitting
    ? "Saving..."
    : verified
    ? `${mode === "edit" ? "Update" : "Create"} ${entityName}`
    : `Verify Email to ${mode === "edit" ? "Update" : "Create"}`;

  const buttonContent = isSubmitting ? (
    <>
      <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
      {buttonText}
    </>
  ) : (
    buttonText
  );

  function isEnabled() {
    if (!user) return true;
    if (verified) return true;
    return false;
  }
  
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={{ xs: "center", sm: "space-between" }}
      alignItems={{ xs: "center", sm: "center" }}
      sx={{ my: 2 }}
    >
      
      <Button
        type="button"
        variant="outlined"
        sx={{ 
          md: { ml: 3 },
          mt: 3, 
          width: {
            xs: '100%', // Full width on extra-small screens and up
            md: 'auto',  // Auto width on medium screens and up
          }
        }}
        size="small"
        
        onClick={onCancel || (() => history.back())}
      >
        cancel
      </Button>

      <Button 
        type="submit" 
        variant="contained" 
        disabled={!isEnabled()}
        sx={{ 
          mt: 3,  
          width: {
            xs: '100%', // Full width on extra-small screens and up
            md: 'auto',  // Auto width on medium screens and up
          }
        }} 
        size="large"
      >
        {buttonContent}
      </Button>
    </Stack>
  );
}
