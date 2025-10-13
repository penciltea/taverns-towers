/**
 * Shops & Guilds have menus with items that are generated per sub-type (shop type and guild type). 
 * Changing the type after the menu has been generated causes errors for the "Category" field, as categories are specific to each sub-type
 * This dialog triggers if the user changes the sub-type after the menu has been generated, prompting for confirmation
 * After confirmation, the menu is reset to empty and the sub-type field's value is updated to the new value
 */

'use client';

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useUIStore } from "@/store/uiStore";

export default function TypeChangeDialog() {
    const { dialogProps, closeDialog } = useUIStore();

    const {
        open = false,
        title,
        message,
        siteChange,
        methods,
    } = dialogProps || {};

    const defaultTitle = `Change ${siteChange?.type === "shop" ? "Shop Type" : "Guild Type"}?`;
    const defaultMessage = `Changing the ${siteChange?.type} type will reset your menu items. Do you wish to continue?`;

    const onConfirm = () => {
        if (siteChange && methods) {
        methods.setValue(siteChange.field, siteChange.value);
        methods.resetField("menu", { defaultValue: [] });
        }

        closeDialog();
    };

    return (
        <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{title || defaultTitle}</DialogTitle>
        <DialogContent>
            <Typography>{message || defaultMessage}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button color="error" variant="contained" onClick={onConfirm}>
            Confirm
            </Button>
        </DialogActions>
        </Dialog>
    );
}