'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import PatreonCta from "./PatreonCta"
import NextMuiLink from "./NextMuiLink";
import ThemedButton from "./Button/ThemedButton";
import HighlightCard from "./HighlightCard";

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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "stretch", justifyContent: "center", py: 8, mx: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" component="h2" gutterBottom>Why RealmFoundry</Typography>
                    <Typography variant="body1" gutterBottom>World-building is fun, but it can quickly become daunting. Every GM knows the moments of hesitation:</Typography>
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
                </Box>
                <Box sx={{ flex: 1 }}>
                    <video autoPlay loop muted playsInline style={{ maxWidth: "100%" }}>
                        <source src="/demo.webm" type="video/webm" />
                        <source src="/demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            </Stack>

            <Box sx={{ py: 6, px: { xs: 2, sm: 4 }, textAlign: "center" }}>
                <Typography variant="h4" component="h3" gutterBottom> Procedural, Not Predictive</Typography>
                <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto" }}>
                    RealmFoundry does not (and never will) use AI to create content. Every result comes from handcrafted, rule-based systems designed for storytellers. From bustling cities to the shadiest shopkeepers, each creation is grounded in logic, lore, and consistency — not randomness.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, maxWidth: 700, mx: "auto" }}> You stay the creator. RealmFoundry just helps bring your imagination to life. </Typography>
            </Box>

            {/* Features Section */}
            <Paper sx={{ px: 2, py: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h4" sx={{ textAlign: "center", marginBottom: 3 }}>Features</Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "stretch", justifyContent: "center" }}>
                    <HighlightCard
                        icon="&#x1F3F0;"
                        title="Create settlements & sites"
                        description="Generate towns, villages, and unique locations in seconds. Customize size, terrain, and special features to fit your world."
                    />
                    <HighlightCard
                        icon="&#x1F4DC;"
                        title="Menus made easy"
                        description="Quickly craft menus for shops, taverns, and more. Include meals, drinks, and magical items with a few clicks."
                    />
                    <HighlightCard
                        icon="&#x1F9DD;"
                        title="Build NPCs"
                        description="Generate names, personalities, traits, and relationships instantly. Bring your towns to life with memorable characters."
                    />
                    <HighlightCard
                        icon="&#x1F528;"
                        title="More tools coming"
                        description="New features are added regularly, including guilds & factions, pantheons, and more ways to bring your world to life."
                    />
                </Stack>
            </Paper>

            <Box 
                sx={{
                    my: 2,
                    py: 8,
                    px: { xs: 2, sm: 4 },
                    background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(180deg, #f8f4e9 0%, #faf3e0 50%, #f8f4e9 100%)"
                        : "linear-gradient(180deg, #2B2B3F 0%, #1d2a3b 50%, #2B2B3F 100%)",
                }}
            >
                <Typography variant="h4" component="h5" gutterBottom textAlign="center">Membership Tiers</Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>Choose a plan that fits your world-building needs.</Typography>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ alignItems: "stretch", justifyContent: "center" }}
                >
                    {/* Free Tier */}
                    <Card variant="outlined" sx={{ flex: 1, p: 3, textAlign: "center" }}>
                        <Typography variant="h6" component="p" gutterBottom>Free</Typography>
                        <Typography variant="subtitle1" gutterBottom>$0</Typography>
                        <List dense>
                            <ListItem>Make up to 5 settlements</ListItem>
                            <ListItem>Create up to 15 sites total</ListItem>
                            <ListItem>Make up to 5 NPCs</ListItem>
                            <ListItem>Access to medieval fantasy themed dropdown options</ListItem>
                        </List>
                        <Typography variant="body2" sx={{ mt: 2 }}>Perfect for getting started with RealmFoundry.</Typography>
                    </Card>

                    {/* Premium Tier */}
                    <Card variant="outlined" sx={{ flex: 1, p: 3, textAlign: "center" }}>
                        <Typography variant="h6" component="p" gutterBottom>Premium</Typography>
                        <Typography variant="subtitle1" gutterBottom>$5/mo</Typography>
                        <List dense>
                            <ListItem>Unlimited settlements, sites, and NPCs</ListItem>
                            <ListItem>Multiple themed dropdown options</ListItem>
                            <ListItem>Access to exclusive content</ListItem>
                            <ListItem>Batch generation & custom options&nbsp;<Typography variant="caption">(coming soon!)</Typography></ListItem>
                        </List>
                        <Typography variant="body2" sx={{ mt: 2 }}>Unlock the full potential of RealmFoundry.</Typography>
                    </Card>

                    {/* Premium+ Tier (Coming Soon) */}
                    <Card
                        variant="outlined"
                        sx={{
                            flex: 1,
                            p: 3,
                            textAlign: "center",
                            opacity: 0.7, // visually show it's not active yet
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "warning.light",
                            color: "black",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            }}
                        >
                            Coming Soon!
                        </Box>
                        <Typography variant="h6" component="p" gutterBottom>Premium+</Typography>
                        <Typography variant="subtitle1" gutterBottom>$10/mo</Typography>
                        <List dense>
                            <ListItem>Advanced templates & bundles</ListItem>
                            <ListItem>Early access to new generators & themes</ListItem>
                            <ListItem>Exclusive content & community perks</ListItem>
                            <ListItem>Shape RealmFoundry&apos;s development with exclusive polls</ListItem>
                        </List>
                        <Typography variant="body2" sx={{ mt: 2 }}>Get ready for the ultimate RealmFoundry experience.</Typography>
                    </Card>
                </Stack>

                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <NextMuiLink href="/membership" underline="always">See full comparison →</NextMuiLink>
                </Box>
            </Box>

            <Box sx={{ textAlign: "center", marginTop: 6, marginBottom: 1 }}>
                <Typography variant="h4" component="h5" gutterBottom textAlign="center">What&apos;s Available & What&apos;s Coming Next</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>See what&apos;s live in the <NextMuiLink href="/releases/" underline="always">Release Notes</NextMuiLink> or what&apos;s coming in the <NextMuiLink href="/roadmap" underline="always">Roadmap</NextMuiLink>.</Typography>
            </Box>

            <PatreonCta />
        </Box>
    )
}