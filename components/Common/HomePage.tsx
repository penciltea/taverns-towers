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

export default function HomeContent() {
    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: (theme) =>
                        theme.palette.mode === "light"
                            ? "linear-gradient(0deg, #00b7c2 -80%, #f8f4e9 100%)"
                            : "linear-gradient(0deg, #00b7c2 -80%, #2B2B3F 100%)",
                    color: (theme) => theme.palette.text.primary,
                    py: 10,
                    px: 0.5,
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Build Worlds, Craft Stories, Play Better
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    Generate towns, locations, and characters with powerful tools tailored for GMs, writers, and world-builders.
                </Typography>
                <Box sx={{ marginTop: 4 }}>
                    <ThemedButton text="create your world" href="/settlements/new" />
                </Box>
            </Box>

            {/* Open Beta Banner */}
            <Box
                sx={{
                    backgroundColor: "warning.light",
                    color: "black",
                    py: 0.5,
                    textAlign: "center",
                    marginTop: 2
                }}
            >
                ⚠️ RealmFoundry is in <strong>Open Beta</strong>! Explore new world-building tools, help shape features, and share your feedback as we continue to improve.
            </Box>

            {/* Pain Points Section */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "stretch", justifyContent: "center", py: 8, my: 2 }}>
                <Box sx={{ flex: 1,  }}>
                    <Typography variant="h4" component="h2" gutterBottom>Why RealmFoundry</Typography>
                    <Typography variant="body1" gutterBottom>World-building is fun, but it can quickly become overwhelming. Every GM or writer knows the moments of hesitation:</Typography>
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
                        Keeping track of kingdoms, towns, artifacts, and the myriad of characters populating your world can slow you down. RealmFoundry conjures this information instantly, generating consistent, hand-crafted content while giving you full control. Want to tweak a village layout, rename a legendary hero, or invent a hidden faction? All of it is fully editable.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Whether you prefer to craft every detail by hand or let RealmFoundry provide a framework to build upon, you&apos;ll spend less time on bookkeeping and more time on what matters most: telling unforgettable stories.
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, alignSelf: 'center' }}>
                    <video autoPlay loop muted playsInline style={{ maxWidth: "100%" }}>
                        <source src="/demo.webm" type="video/webm" />
                        <source src="/demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            </Stack>
            

            {/* Procedural Section */}
            <Box
                sx={{
                    py: 5,
                    px: { xs: 2, sm: 4 },
                    textAlign: "center",
                    backgroundColor: (theme) => theme.palette.mode === "light" ? "#f0f8ff" : "#1e1e2e",
                    borderRadius: 2,
                    my: 8,
                    position: "relative",
                }}
            >
                {/* Fantasy Accent Icon */}
                <Box sx={{ fontSize: 48, mb: 2 }}>✨</Box>
                <Typography variant="h4" component="h3" gutterBottom>Procedural, Not Predictive</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>RealmFoundry does not (and never will) use AI to create content.</Typography>
                <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto" }}>
                    Every result comes from handcrafted, rule-based systems designed for storytellers. From bustling cities to the shadiest shopkeepers, each creation is grounded in logic, lore, and consistency, not randomness.
                </Typography>
                <Typography variant="body1" sx={{ my: 2, maxWidth: 700, mx: "auto" }}>
                    You stay the creator. RealmFoundry just helps bring your imagination to life.
                </Typography>
            </Box>

            <Box sx={{ textAlign: "center", my: 6 }}>
                <Typography variant="h2" sx={{ fontSize: 36, opacity: 0.08 }}>🜃 🜂 🜚 🜁 🜄</Typography>
            </Box>

            {/* How It Works Section */}
            <Box
                sx={{
                    py: 8,
                    px: { xs: 2, sm: 4 },
                    textAlign: "center",
                    backgroundColor: (theme) => theme.palette.mode === "light" ? "#f8f4e9" : "#1e1e2e",
                    borderRadius: 2,
                    my: 6,
                }}
            >
                <Typography variant="h4" component="h3" gutterBottom>How It Works</Typography>
                <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
                    Build your world in seconds with just a few simple steps:
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={4} justifyContent="center">
                    {/* Step 1 */}
                    <Card variant="outlined" sx={{ flex: 1, p: 3, textAlign: "center" }}>
                        <Typography variant="h3">🗺️</Typography>
                        <Typography variant="h6" gutterBottom>Shape Your Realm</Typography>
                        <Typography variant="body2">
                            Generate towns, villages, and locations with customized terrain, size, and features.
                        </Typography>
                    </Card>

                    {/* Step 2 */}
                    <Card variant="outlined" sx={{ flex: 1, p: 3, textAlign: "center" }}>
                        <Typography variant="h3">🧙</Typography>
                        <Typography variant="h6" gutterBottom>Populate with Legends</Typography>
                        <Typography variant="body2">
                            Generate characters with names, traits, and relationships instantly.
                        </Typography>
                    </Card>

                    {/* Step 3 */}
                    <Card variant="outlined" sx={{ flex: 1, p: 3, textAlign: "center" }}>
                        <Typography variant="h3">📜</Typography>
                        <Typography variant="h6" gutterBottom>Embark on Adventures</Typography>
                        <Typography variant="body2">
                            Add your own details or tweak generated content, then enjoy your adventures.
                        </Typography>
                    </Card>
                </Stack>
            </Box>

            
            <Box sx={{ textAlign: "center", my: 6 }}>
                <Typography variant="h2" sx={{ fontSize: 36, opacity: 0.08 }}>🜄 🜁 🜚 🜂 🜃</Typography>
            </Box>

            {/* Features Section */}
            <Paper sx={{ px: 2, py: 4, my: 8, borderRadius: 2 }}>
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

            <Box sx={{ textAlign: "center", my: 6 }}>
                <Typography variant="h2" sx={{ fontSize: 36, opacity: 0.08 }}>🜄 🜂 🜚 🜁 🜃</Typography>
            </Box>

            {/* Membership Tiers */}
            <Box
                sx={{
                    my: 8,
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
                        <Typography variant="body2" sx={{ mt: 2 }}>Unlock RealmFoundry's full potential.</Typography>
                    </Card>

                    {/* Premium+ Tier (Coming Soon) */}
                    <Card
                        variant="outlined"
                        sx={{
                            flex: 1,
                            p: 3,
                            textAlign: "center",
                            opacity: 0.7,
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

            <Box sx={{ textAlign: "center", my: 6 }}>
                <Typography variant="h2" sx={{ fontSize: 36, opacity: 0.08 }}>🜃 🜁 🜚 🜂 🜄</Typography>
            </Box>

            {/* Release Notes & Roadmap */}
            <Box sx={{ textAlign: "center", marginTop: 6, marginBottom: 1 }}>
                <Typography variant="h4" component="h5" gutterBottom textAlign="center">
                    What&apos;s Available & What&apos;s Coming Next
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    See what&apos;s live in the <NextMuiLink href="/releases/" underline="always">Release Notes</NextMuiLink> or what&apos;s coming in the <NextMuiLink href="/roadmap" underline="always">Roadmap</NextMuiLink>.
                </Typography>
            </Box>

            <PatreonCta />
        </Box>
    )
}
