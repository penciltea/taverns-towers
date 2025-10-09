import PatreonCta from "@/components/Common/PatreonCta";
import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

export default function Roadmap(){
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" sx={{marginBottom: 3}}>What&apos;s Coming Next</Typography>

            {/* Name & Generation Enhancements */}
            <Typography variant="h5" gutterBottom>Name & Generation Enhancements</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>More robust settlement names:</strong>}
                        secondary={<span> Adding more themed names for unique and flavorful generations</span>}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Automatic site generation:</strong>}
                        secondary={<span> Optionally generate appropriate sites when creating a new settlement, previewing types and quantities before submission.</span>}
                    />
                </ListItem>
            </List>

            {/* Guilds & Factions */}
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Guilds & Factions</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Guilds & Factions support:</strong>}
                        secondary={<span> Create localized or cross-settlement groups with details and NPC relationships.</span>}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Revamped Guild Site form:</strong>}
                        secondary={<span> Prevents name overlaps once guilds/factions are fully implemented.</span>}
                    />
                </ListItem>
            </List>

            {/* NPC Enhancements */}
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>NPC Enhancements</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Expanded NPC fields:</strong>}
                        secondary={<span> Occupation, likes/dislikes, and other traits will give NPCs more personality.</span>}
                    />
                </ListItem>
            </List>

            {/* UI & Visuals */}
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>UI & Visuals</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Additional placeholder images."
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Improved image upload/selection with pre-generated options."
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="New UI themes."
                    />
                </ListItem>
            </List>

            {/* Account & Sharing */}
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Account & Sharing</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="'Publicly available' flag to control visibility of creations."
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Public Library for sharing creations with other members."
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Shorter sharing URLs"
                    />
                </ListItem>
            </List>

            <PatreonCta />
        </Paper>
    )
}