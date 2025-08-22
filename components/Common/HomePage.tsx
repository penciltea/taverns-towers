'use client'

import { Box, Typography, Button, Container, List, ListItem, ListItemText, Stack } from "@mui/material"
import PatreonCta from "./PatreonCta"
import Link from "next/link"

export default function HomeContent(){
    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    py: 10,
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>Build Worlds, Craft Stories, Play Better</Typography>
                <Typography variant="h6" component="p" gutterBottom>Generate towns, locations, and characters with powerful tools tailored for GMs, writers, and world-builders.</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 4 }}
                    component={Link}
                    href="/settlements/new"
                >
                    Create Your World
                </Button>
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
            <Container sx={{ py: 8, backgroundColor: "grey.100", borderRadius: 2 }}>
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
                    See what's live in the <a href="/alpha-notes">Alpha Release Notes</a> or what's coming in the{" "}<Link href="/roadmap">Roadmap</Link>.
                </Typography>
            </Container>

            <PatreonCta />
        </Box>
    )
}