'use client'

import { Box, Typography, Container, List, ListItem, ListItemText, Paper } from "@mui/material"
import PatreonCta from "./PatreonCta"
import NextMuiLink from "./NextMuiLink";
import ThemedButton from "./ThemedButton";

export default function HomeContent(){
    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(0deg, #00b7c2 -80%, #f8f4e9 100%)"
                        : "linear-gradient(0deg, #00b7c2 -80%, #2B2B3F 100%)", // dark mode gradient
                    color: (theme) => theme.palette.text.primary,
                    py: 10,
                    px: 0.5,
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>Build Worlds, Craft Stories, Play Better</Typography>
                <Typography variant="h6" component="p" gutterBottom>Generate towns, locations, and characters with powerful tools tailored for GMs, writers, and world-builders.</Typography>
                <Box sx={{ marginTop: 4 }}>
                    <ThemedButton text="create your world" href="/settlements/new" />
                </Box>
            </Box>

            {/* Alpha Banner */}
            <Box
                sx={{
                    backgroundColor: "warning.light",
                    color: "black",
                    py: 0.5,
                    textAlign: "center",
                    marginTop: 2
                }}
            >
                ⚠️ RealmFoundry is in alpha. Some features may change as we collect feedback from users.
            </Box>

            {/* Pain Points Section */}
            <Container sx={{ py: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Why RealmFoundry
            </Typography>
            <Typography variant="body1" gutterBottom>
                World-building is fun, but it can quickly become daunting. Every GM knows the moments of hesitation:
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }} >
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                    <ListItemText primary="“What does this shop sell?”" />
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                    <ListItemText primary="“Is there a magic shop here?”" />
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                    <ListItemText primary="“What's the barkeep's name?”" />
                </ListItem>
            </List>
            <Typography variant="body1" sx={{ mt: 2 }}>
                RealmFoundry conjures information instantly using procedural generation, keeping your gameplay smooth and effortless. Prefer to craft your world by hand? Enter as much detail as you like.
            </Typography>
            </Container>

            {/* Features Section */}
            <Paper sx={{ px: 2, py: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    What You Can Do Right Now
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemText primary="🏘️ Create settlements and sites with procedural generators" />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary="👤 Build NPCs with names, traits, and relationships" />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary="💾 Save and manage your world in a mobile-friendly interface" />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary="🛠️ More tools coming soon!" />
                    </ListItem>
                </List>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    See what&apos;s live in the <NextMuiLink href="/releases/alpha-25-09-03" underline="always">Alpha Release Notes</NextMuiLink> or what&apos;s coming in the <NextMuiLink href="/roadmap" underline="always">Roadmap</NextMuiLink>.
                </Typography>
            </Paper>

            <PatreonCta />
        </Box>
    )
}