'use client';

import { useState, useTransition } from "react";
import  Button  from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUIStore } from "@/store/uiStore";
import DeleteConfirmationDialog from "@/components/Common/Dialog/DeleteConfirmationDialog";

interface DeleteButtonProps<T = unknown> {
    id: string;
    entity: string;
    deleteAction: (id: string) => Promise<T>;
    onSuccess?: () => void;
}

export default function DeleteButton({ id, entity, deleteAction, onSuccess }: DeleteButtonProps) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const closeParentDialog = useUIStore((state) => state.closeDialog);

    const handleConfirm = () => {
        startTransition(async () => {
        try {
            await deleteAction(id);
            setConfirmOpen(false);
            closeParentDialog(); // Close SiteDetailsDialog after successful delete
            onSuccess?.();
        } catch (error) {
            console.error(`Failed to delete ${entity}:`, error);
        }
        });
    };

    return (
        <>
            <Button
                sx={{ mx: 1 }}
                variant="text"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setConfirmOpen(true)}
                disabled={isPending}
            >
                {isPending ? "Deleting..." : "Delete"}
            </Button>

            <DeleteConfirmationDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirm}
                deleting={entity}
            />
        </>
    );
}
