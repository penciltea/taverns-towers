"use client";

import { useFormContext } from "react-hook-form";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AccordionWrapper } from "@/components/Common/AccordionWrapper";
import { NPC_CONNECTION_NPC_ROLE, NPC_CONNECTION_SETTLEMENT_ROLE, NPC_CONNECTION_SITE_ROLE, NpcConnectionType } from "@/constants/npc.options";
import { useOwnedSettlementsQuery } from "@/hooks/settlement/settlement.query";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { useOwnedSitesQuery } from "@/hooks/site/site.query";
import EntityLinkForm, { ConnectionItem } from "@/components/Common/EntityLink/EntityLinkForm";

export default function NpcFormConnections() {
  const { control, watch, setValue } = useFormContext();

  const { data: settlementsData, isLoading: settlementsLoading } = useOwnedSettlementsQuery({}, { isEnabled: true });
  const { data: sitesData, isLoading: sitesLoading } = useOwnedSitesQuery({}, { isEnabled: true });
  const { data: npcsData, isLoading: npcsLoading } = useOwnedNpcsQuery({}, { isEnabled: true });

  const rawConnections = watch("connections");
  const connections: ConnectionItem[] = Array.isArray(rawConnections) ? rawConnections : [];

  const handleConnectionsChange = (type: string, updated: ConnectionItem[]) => {
    const existing = connections.filter(c => c.type !== type);
    const updatedWithType = updated.map(c => ({ ...c, type }));
    setValue("connections", [...existing, ...updatedWithType]);
  };

  const formatOptions = (items?: any[]) => (items ?? []).map(item => ({ id: item._id, name: item.name }));

  const renderAccordion = ({
    label,
    type,
    loading,
    options,
    roleOptions,
  }: {
    label: string;
    type: NpcConnectionType;
    loading: boolean;
    options: { id: string; name: string }[];
    roleOptions: { label: string; value: string }[];
  }) => {
    if (loading) {
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>{label}</Typography>
          <CircularProgress size={24} />
        </Box>
      );
    }

    if (options.length === 0) {
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>{label}</Typography>
          <Typography variant="body2" color="text.secondary">No {label.toLowerCase()} found.</Typography>
        </Box>
      );
    }

    return (
        <AccordionWrapper label={label}>
            <EntityLinkForm
                type={type}
                label={label}
                availableOptions={options}
                value={connections.filter(c => c.type === type)}
                onChange={(updated: ConnectionItem[]) => handleConnectionsChange(type, updated)}
                roleOptions={roleOptions}
                control={control}
                namePrefix={`connections.${type}`}
            />
        </AccordionWrapper>
    );
  };

  return (
    <>
      {renderAccordion({
        label: "Settlements",
        type: "settlement",
        loading: settlementsLoading,
        options: formatOptions(settlementsData?.settlements),
        roleOptions: NPC_CONNECTION_SETTLEMENT_ROLE,
      })}
      {renderAccordion({
        label: "Sites",
        type: "site",
        loading: sitesLoading,
        options: formatOptions(sitesData?.sites),
        roleOptions: NPC_CONNECTION_SITE_ROLE,
      })}
      {renderAccordion({
        label: "NPCs",
        type: "npc",
        loading: npcsLoading,
        options: formatOptions(npcsData?.npcs),
        roleOptions: NPC_CONNECTION_NPC_ROLE,
      })}
    </>
  );
}
