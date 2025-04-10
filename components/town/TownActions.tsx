'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TownActions({ townId }: { townId: string }) {
  const router = useRouter();
  const { openDialog } = useUIStore();

  const handleEdit = () => {
    router.push(`/towns?id=${townId}`);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/towns/${townId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete town");

      // Optional: Redirect or refresh town list after deletion
      router.push("/"); // or close dialog + refetch list
    } catch (err) {
      console.error("Error deleting town:", err);
    }
  };

  return (
    <Box>
      <Button sx={{ mx: 1 }} variant="outlined" startIcon={<EditIcon />}  onClick={handleEdit}>
        Edit
      </Button>
      <Button sx={{ mx: 1 }} variant="text" startIcon={<DeleteIcon />} onClick={() => useUIStore.getState().setOpenDialog('TownDetailsDialog')}>
        Delete
      </Button>
    </Box>
  );
}