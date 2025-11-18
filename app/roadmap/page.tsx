import PatreonCta from "@/components/Common/PatreonCta";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Roadmap(){
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>What&apos;s Coming Next</Typography>
            <Typography sx={{marginBottom: 3}}>Curious about the upcoming releases? Below is a list of upcoming features, improvements, and more! More details, updates, and sneak peeks about upcoming releases can be found on RealmFoundry&apos;s Patreon page.</Typography>


            <Typography variant="h5" gutterBottom>Version 3.0: Open Beta launch</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Experience RealmFoundry's Core:</strong>}
                        secondary={<span> Settlements, Sites, and NPCs are more polished.</span>}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Campaign Management:</strong>}
                        secondary={<span> Artisan & Architect tier members will be able to create campaigns, manage access and editing permissions for campaign players, and create content in the context of that campaign.</span>}
                    />
                </ListItem>
            </List>


            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Version 3.1</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Improved functionality</strong>}
                        secondary={<span> &quot;Copy&quot; and &quot;Move to...&quot; functionality for content</span>}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Exporting data:</strong>}
                        secondary={<span> Artisans & Architects will be able to export their data. We're starting with JSON data and will be rolling out support for PDFs, VTT formats, and more!</span>}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Description fields:</strong>}
                        secondary={<span> We&apos;ll be steadily rolling out updates to generator logic to include Description fields</span>}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>NPC fields:</strong>}
                        secondary={<span> Similarly, NPC generation logic will add support for Likes & Dislikes fields</span>}
                    />
                </ListItem>
            </List>


            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Version 3.3</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>New Content - Guilds & Factions:</strong>}
                        secondary={<span> From local street thugs to settlement-spanning merchant guilds, we&apos;ll be adding support for guilds and factions!</span>}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Improvement - Guild Sites:</strong>}
                        secondary={<span> The Guild site creation form will receive an overhaul to align with the new guilds & factions content!</span>}
                    />
                </ListItem>
            </List>


            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Version 3.4</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>Bulk Site Creation</strong>}
                        secondary={<span> During settlement creation, Artisans & Architects will be able to opt in to creating sites, following generator logic to create sites that make sense. After all, a port town needs at least a dock and a tavern!</span>}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Support for shortened URLs"
                    />
                </ListItem>
            </List>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Version 3.4</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary={<strong>New Content - Pantheons & Lore!</strong>}
                    />
                </ListItem>
            </List>

            <PatreonCta />
        </Paper>
    )
}