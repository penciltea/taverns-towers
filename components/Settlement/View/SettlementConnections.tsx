'use client';

import { Paper, Typography } from "@mui/material";
import { useResolvedConnections } from "@/hooks/npc/npc.query";
import EntityLinkList from "@/components/Common/EntityLink/EntityLinkList";
import { ConnectionProps } from "@/interfaces/connection.interface";

export default function SettlementConnections({ connections }: ConnectionProps) {
    const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);

    if (isLoading) {
        return (
       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5">Connections</Typography>
            <Typography variant="body2" color="text.secondary">Loading connections...</Typography>
        </Paper>
        );
    }

    if (!resolvedConnections || resolvedConnections.length === 0) {
        return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5">Connections</Typography>
            <Typography variant="body2" color="text.secondary">No connections available.</Typography>
        </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <EntityLinkList connections={resolvedConnections} showType={false} />
        </Paper>
    );
}
