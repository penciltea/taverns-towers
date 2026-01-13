"use client";

import { useFormContext } from "react-hook-form";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import EntityLinkForm, { ConnectionItem } from "@/components/Common/EntityLink/EntityLinkForm";
import { SiteFormData } from "@/schemas/site.schema";
import { useSiteContentStore } from "@/store/siteStore";
import { useSearchParams } from "next/navigation";
import { Option } from "@/interfaces/options.interface";
import { NPC_CONNECTION_SITE_ROLE, NPC_CONNECTION_SITE_TYPE_ROLES } from "@/constants/npc.options";

interface Props {
  mode: "add" | "edit" | null;
}

export default function SiteFormConnections({ mode }: Props) {
  const { control, watch, setValue } = useFormContext();
  const { selectedItem } = useSiteContentStore();  
  const searchParams = useSearchParams();

  const { data: npcsData, isLoading: npcsLoading } = useOwnedNpcsQuery({}, { isEnabled: true });

  const typeParam = mode === 'edit'
    ? selectedItem?.type
    : (searchParams?.get("type") as SiteFormData["type"]);

  const rawConnections = watch("connections");
  const connections: ConnectionItem[] = Array.isArray(rawConnections) ? rawConnections : [];

  const handleNpcConnectionsChange = (updated: ConnectionItem[]) => {
    // Always force type = "npc"
    const updatedWithType = updated.map(c => ({ ...c, type: "npc" }));
    setValue(
      "connections",
      // Remove existing npc connections before adding updated ones
      [...connections.filter(c => c.type !== "npc"), ...updatedWithType]
    );
  };  

  function getSiteRoles(siteType?: string): Option[] {
    return [
      ...NPC_CONNECTION_SITE_ROLE,
      ...(siteType ? NPC_CONNECTION_SITE_TYPE_ROLES[siteType] ?? [] : []),
      { label: "Other", value: "other" }
    ];
  }

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
      type="npc"
      value={connections.filter(c => c.type === "npc")}
      onChange={handleNpcConnectionsChange}
      availableOptions={npcOptions}
      roleOptions={getSiteRoles(typeParam)}
      control={control}
      namePrefix="connections.npc"
    />
  );
}
