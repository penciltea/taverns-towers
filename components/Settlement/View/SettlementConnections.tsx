'use client';

import { Box, Paper, Typography } from "@mui/material";
import { useResolvedConnections } from "@/hooks/npc/npc.query";
import EntityLinkList from "@/components/Common/EntityLink/EntityLinkList";
import { ConnectionProps } from "@/interfaces/connection.interface";

export default function SettlementConnections({ connections }: ConnectionProps) {
    const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);

    if (isLoading) {
        return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Connections</Typography>
            <Typography variant="body2" color="text.secondary">Loading connections...</Typography>
        </Box>
        );
    }

    if (!resolvedConnections || resolvedConnections.length === 0) {
        return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Connections</Typography>
            <Typography variant="body2" color="text.secondary">No connections available.</Typography>
        </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <EntityLinkList connections={resolvedConnections} showType={false} />
        </Paper>
    );
}
