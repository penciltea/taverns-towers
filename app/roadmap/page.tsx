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
            <Typography gutterBottom>RealmFoundry is being built with one primary goal: helping Game Masters create, find, and adapt content quickly, especially mid-session.</Typography>
            <Typography sx={{marginBottom: 3}}>This roadmap highlights the major areas of focus coming next. The order reflects priority, not exact release timing.</Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Improving Core Generation (In Progress & Ongoing)</Typography>
            <Typography gutterBottom>These updates improve the quality and usefulness of generated content across the entire app. They will benefit all content types and membership tiers.</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding key="item-1">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Generating descriptions for Sites & Settlements that can be read aloud at the table."
                    />
                </ListItem>
                <ListItem disablePadding key="item-2">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Continued releases of new generation themes for better tone and flavor."
                    />
                </ListItem>
                <ListItem disablePadding key="item-3">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Continued refinements of existing generation logic."
                    />
                </ListItem>
            </List>


            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Faster Navigation & Content Control</Typography>
            <Typography gutterBottom>These features make RealmFoundry easier to use as your content library grows.</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding key="item-1">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Global search functionality to quickly find any content you've created across all campaigns and content types. These improvements will help reduce friction, fix mistakes instantly, and keep your sessions moving."
                    />
                </ListItem>
                <ListItem disablePadding key="item-2">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Move content across the app without deleting or recreating them."
                    />
                </ListItem>
            </List>


            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Campaign Customization (Artisan & Architect Tiers)</Typography>
            <Typography gutterBottom>These tools help RealmFoundry respect your world's canon. They're ideal for campaigns with specific lore or restrictions.</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding key="item-1">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Campaign-level control options, such as choosing what races are available for use within the campaign."
                    />
                </ListItem>
                <ListItem disablePadding key="item-2">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Custom dropdown content, such as adding your own races, for use throughout the app."
                    />
                </ListItem>
            </List>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Speed & Scaling Tools (Artisan & Architect Tiers)</Typography>
            <Typography gutterBottom>For GMs who want to generate more, faster-- keeping your session prep quick and easy.</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding key="item-1">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Creating multiple Sites, NPCs, or other content in one action."
                    />
                </ListItem>
                <ListItem disablePadding key="item-2">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Settlement templates will automatically generate sites based on settlement size and tags (e.g. ports generate docks, taverns, warehouses, etc.)."
                    />
                </ListItem>
            </List>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>New World-building Content Types</Typography>
            <Typography gutterBottom>Expanding RealmFoundry beyond people and places. These new content types will naturally integrate with the existing content as appropriate.</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding key="item-1">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Guilds & Factions (with a redesigned Guild site experience)"
                    />
                </ListItem>
                <ListItem disablePadding key="item-2">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Pantheons"
                    />
                </ListItem>
                <ListItem disablePadding key="item-3">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Flora & Fauna"
                    />
                </ListItem>
                <ListItem disablePadding key="item-4">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Lore"
                    />
                </ListItem>
            </List>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Exporting, Sharing, & Community</Typography>
            <Typography gutterBottom>Helping your work travel beyond just a single campaign in RealmFoundry. These updates will foster RealmFoundry as a community.</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem disablePadding key="item-1">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Exporting to JSON, PDF, and VTT formats."
                    />
                </ListItem>
                <ListItem disablePadding key="item-2">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Share content with other users in the RealmFoundry Collections, favorite others' creations, and copy them into your campaigns."
                    />
                </ListItem>
                <ListItem disablePadding key="item-3">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Official RealmFoundry Discord server and subReddit."
                    />
                </ListItem>
                <ListItem disablePadding key="item-4">
                    <ListItemText
                        sx={{ display: 'list-item' }}
                        disableTypography
                        primary="Feedback-driven iteration and feature prioritization."
                    />
                </ListItem>
            </List>

            <PatreonCta />
        </Paper>
    )
}