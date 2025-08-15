import { Box, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useResolvedConnections } from "@/hooks/npc/npc.query";
import { Npc } from "@/interfaces/npc.interface";

interface Props {
  connections: Npc['connections'];
}

export default function SettlementConnections({ connections }: Props) {
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

    // Group by type
    const grouped = resolvedConnections.reduce<Record<string, typeof resolvedConnections>>((acc, conn) => {
        if (!acc[conn.type]) acc[conn.type] = [];
        acc[conn.type].push(conn);
        return acc;
    }, {});

    return (
        <Grid size={{xs: 12}} sx={{ marginTop: 4 }}>
            <Typography variant="h4" component="h3" sx={{ mb: 2 }}>Connections</Typography>
            <Divider sx={{ mb: 2 }} />

            {Object.entries(grouped).map(([type, group]) => (
                <Box key={type} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 1 }}>{type}s</Typography>
                    <List dense>
                        {group.map((conn) => (
                            <ListItem key={conn.id}>
                                <ListItemText
                                    sx={{ textTransform: 'capitalize'}}
                                    primary={conn.name}
                                    secondary={conn.role ? `Role: ${conn.role}` : undefined}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ))}
        </Grid>
    );
}
