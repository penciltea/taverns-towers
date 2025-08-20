import { Box, Grid, Typography } from "@mui/material";
import { useResolvedConnections } from "@/hooks/npc/npc.query";
import EntityLinkList from "@/components/Common/EntityLink/EntityLinkList";
import { ConnectionProps } from "@/interfaces/connection.interface";

export default function NpcConnections({ connections }: ConnectionProps) {
    const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);

    console.log("conns: ", resolvedConnections);

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
        <Grid size={{xs: 12}} sx={{ marginTop: 4 }}>
            <EntityLinkList connections={resolvedConnections} showType={true} />
        </Grid>
    );
}
