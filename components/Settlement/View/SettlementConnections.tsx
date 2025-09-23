'use client';

import { Paper, Typography } from "@mui/material";
import { useResolvedConnections } from "@/hooks/npc/npc.query";
import EntityLinkList from "@/components/Common/EntityLink/EntityLinkList";
import { ConnectionProps } from "@/interfaces/connection.interface";

export default function SettlementConnections({ connections }: ConnectionProps) {
    const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);

    let content;
    if (isLoading) {
        content = (
            <Typography variant="body2">Loading connections...</Typography>
        );
    } else if (!resolvedConnections || resolvedConnections.length === 0) {
        content = (
            <Typography variant="body1">No connections yet. Try linking your NPCs to the places they live or the people they love (or despise). These ties turn a list of names into a living web of stories.</Typography>
        );
    } else {
        content = (
            <EntityLinkList connections={resolvedConnections} showType={false} />
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h5">NPC Connections</Typography>
            {content}
        </Paper>
    );
}
