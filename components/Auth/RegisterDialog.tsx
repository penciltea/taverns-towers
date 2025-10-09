'use client';

import { AuthDialogProps } from "@/interfaces/dialogProps.interface";
import { buildOAuthProviders } from "@/lib/util/authHelpers";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";
import RegisterContent from "./RegisterContent";
import { useUIStore } from "@/store/uiStore";

export default function RegisterDialog({ open, onClose, onRegisterSuccess, draftKey, draftItem }: AuthDialogProps){
    const currentPath = window.location.pathname + window.location.search;
    const oauthProviders = buildOAuthProviders(currentPath);
    const { setOpenDialog } = useUIStore();

    const handleNativeSuccess = () => {
        if (draftKey && draftItem) {
        sessionStorage.setItem(draftKey, JSON.stringify(draftItem));
        }
        onRegisterSuccess?.();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogContent>
                <RegisterContent
                    onNativeSuccess={handleNativeSuccess}
                    oauthProviders={oauthProviders}
                    skipRedirect
                />
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Have an account? { " "}
                    <MuiLink
                        component="button"
                        type="button"
                        underline="always"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            onClose();
                            setOpenDialog("LoginDialog", { draftKey, draftItem });
                        }}
                    >
                        Sign in
                    </MuiLink>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}