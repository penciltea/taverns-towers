import NextMuiLink from "@/components/Common/NextMuiLink";
import PatreonCta from "@/components/Common/PatreonCta";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

export const metadata = {
    title: "RealmFoundry Alpha Release - 2025-08-22",
    description: "Alpha release of RealmFoundry with settlement, site, and NPC generators. Features are in early development and subject to change.",
};

export default function AlphaRelease() {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            {/* Header */}
            <Typography variant="h3" component="h1" gutterBottom>RealmFoundry Alpha Release - FullDateTBD</Typography>
            <Typography variant="body1" gutterBottom>
                Welcome to the limited alpha of RealmFoundry! This release is an early look at the tools we&apos;re building for GMs, writers, and world-builders. Features are still in development, so expect some rough edges. Your feedback is invaluable as we shape the project.
            </Typography>

            {/* What's Available */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" component="h2" gutterBottom>What&apos;s Available</Typography>
                <List sx={{ listStyleType: 'disc', pl: 4 }}>
                    <ListItem disablePadding>
                        <ListItemText 
                            sx={{ display: 'list-item' }}
                            disableTypography 
                            primary={<strong>Settlement, Site, and NPC creation:</strong>}  
                            secondary={<span> Users can manually create or fully generate settlements, sites, and NPCs.</span>}
                         />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary={<strong>Selective generation:</strong>}
                            secondary={
                                <span> Choose how much the generator fills in:
                                    <List sx={{ listStyleType: 'disc', pl: 4 }}>
                                        <ListItem disablePadding>
                                            <ListItemText
                                                sx={{ display: 'list-item' }}
                                                disableTypography
                                                primary="Fill all fields."
                                            />
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemText
                                                sx={{ display: 'list-item' }}
                                                disableTypography
                                                primary='Fill only empty or "random" fields, preserving existing data.'
                                            />
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemText
                                                sx={{ display: 'list-item' }}
                                                disableTypography
                                                primary="Generate just the name field for quick inspiration."
                                            />
                                        </ListItem>
                                    </List>
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary={<strong>NPC Connections:</strong>}
                            secondary={<span> Link NPCs to sites and settlements to assign leaders, owners, and other roles. Never scramble for names again.</span>}
                        />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary={<strong>Two-way connection synergies:</strong>}
                            secondary={<span> Connections automatically mirror between NPCs. Pairing roles like parent/child or teacher/student update both sides.</span>}
                        />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary={<strong>Search and filter:</strong>}
                            secondary={<span> Quickly locate settlements, sites, and NPCs.</span>}
                        />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary={<strong>Sharing:</strong>}
                            secondary={<span> Share URLs with friends. Only the creator can edit or delete. &quot;GM Notes&quot; fields remain private.</span>}
                        />
                    </ListItem>
                </List>
            </Box>

            {/* Known Limitations */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" component="h3" gutterBottom>Known Limitations</Typography>
                <List sx={{ listStyleType: 'disc', pl: 4 }}>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary="Generators currently do not fill in description, public notes, or GM notes."
                        />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary="Generators do not automatically generate NPC Connections."
                        />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary="Sites, Settlements, and NPCs all use the same placeholder image on 'View All' screens."
                        />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary="Users can currently create their account but cannot edit account information or view account details."
                        />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText
                            sx={{ display: 'list-item' }}
                            disableTypography
                            primary="Data may be reset during alpha testing."
                        />
                    </ListItem>
                </List>
            </Box>

            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" component="h4" gutterBottom>Looking Ahead</Typography>
                <Typography variant="body1">For a full view of planned features and updates, check out our <NextMuiLink href="/roadmap" underline="always">Roadmap</NextMuiLink>.</Typography>
            </Box>

            <PatreonCta />

        </Paper>
    );
}