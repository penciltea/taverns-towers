"use client";

import { useFormContext } from "react-hook-form";
import { Box, CircularProgress, Typography } from "@mui/material";
import { NPC_CONNECTION_NPC_ROLE, NPC_CONNECTION_SETTLEMENT_ROLE } from "@/constants/npc.options";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import EntityLinkForm, { ConnectionItem } from "@/components/Common/EntityLink/EntityLinkForm";

export default function SettlementFormConnections() {
  const { control, watch, setValue } = useFormContext();

  const { data: npcsData, isLoading: npcsLoading } = useOwnedNpcsQuery({}, { isEnabled: true });

  const rawConnections = watch("connections");
  const connections: ConnectionItem[] = Array.isArray(rawConnections) ? rawConnections : [];

  const handleNpcConnectionsChange = (updated: ConnectionItem[]) => {
    // Always force type = "npc"
    const updatedWithType = updated.map(c => ({ ...c, type: "settlement" }));
    setValue(
      "connections",
      // Remove existing npc connections before adding updated ones
      [...connections.filter(c => c.type !== "settlement"), ...updatedWithType]
    );
  };

  const npcOptions = (npcsData?.npcs ?? []).map((npc) => ({
    id: npc._id,
    name: npc.name,
  }));

  if (npcsLoading) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>NPCs</Typography>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (npcOptions.length === 0) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>NPCs</Typography>
        <Typography variant="body2" color="text.secondary">
          No NPCs found.
        </Typography>
      </Box>
    );
  }

  return (
    <EntityLinkForm
      // Show existing NPC connections only
      label="NPC"
      type="settlement"
      value={connections.filter(c => c.type === "settlement")}
      onChange={handleNpcConnectionsChange}
      availableOptions={npcOptions}
      roleOptions={NPC_CONNECTION_SETTLEMENT_ROLE}
      control={control}
      namePrefix="connections.settlement"
    />
  );
}
