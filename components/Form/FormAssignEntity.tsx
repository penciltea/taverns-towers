"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Button, Box, Chip, Typography } from "@mui/material";
import { useUIStore } from "@/store/uiStore";

interface AssignEntityFieldProps<T> {
    name: string; // field name in react-hook-form
    label?: string; // button label
    dialogComponent: React.ComponentType<{
        open: boolean;
        onClose: () => void;
        selected: T[];
        onConfirm: (items: T[]) => void;
    }>;
    initialSelected?: T[];
    getLabel: (item: T) => string; // function to extract label for display
}

export default function FormAssignEntityField<T>({
    name,
    label,
    dialogComponent: DialogComponent,
    initialSelected = [],
    getLabel
}: AssignEntityFieldProps<T>) {
    const { watch, setValue } = useFormContext();
    const { setOpenDialog } = useUIStore();
  
    const { data: session } = useSession();
    const user = session?.user ? { id: session.user.id } : null;

    const [dialogOpen, setDialogOpen] = useState(false);
    const selectedItems: T[] = watch(name) || initialSelected;

    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                {selectedItems.length > 0 ? (
                selectedItems.map((item, idx) => (
                    <Chip key={idx} label={getLabel(item)} size="small" />
                ))
                ) : (
                <Typography variant="body2" color="textSecondary">
                    No {label ?? "items"} assigned
                </Typography>
                )}
            </Box>
            <Button
                variant="outlined"
                onClick={() => {
                if (!user) {
                    setOpenDialog("LoginDialog", {});
                } else {
                    setDialogOpen(true);
                }
                }}
                disabled={!user}
            >
                {selectedItems.length ? `Change ${label ?? "Items"}` : `Assign ${label ?? "Items"}`}
            </Button>

            <DialogComponent
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                selected={selectedItems}
                onConfirm={(items: T[]) => {
                    setValue(name, items, { shouldValidate: true });
                    setDialogOpen(false);
                }}
            />
        </Box>
    );
}
