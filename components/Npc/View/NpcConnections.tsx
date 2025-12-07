'use client';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useResolvedConnections } from "@/hooks/npc/npc.query";
import EntityLinkList from "@/components/Common/EntityLink/EntityLinkList";
import { ConnectionProps } from "@/interfaces/connection.interface";

export default function NpcConnections({ connections }: ConnectionProps) {
    const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);

    let content;

    if (isLoading) {
        content = (
            <Typography variant="body2">Loading connections...</Typography>
        );
    } else if (!resolvedConnections || resolvedConnections.length === 0) {
        content = (
            <>
                <Typography variant="h4" gutterBottom>Connections</Typography>
                <Typography variant="body1">No connections yet! Who does this character know? Where do they belong? Add a connection to weave them into the tapestry of your world.</Typography>
            </>
        );
    } else {
        content = (
            <Grid size={{xs: 12}} sx={{ marginTop: 4 }}>
                <EntityLinkList connections={resolvedConnections} showType={false} />
            </Grid>
        )
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            { content }
        </Paper>
    );
}
