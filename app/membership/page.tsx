"use client";

import PatreonCta from "@/components/Common/PatreonCta";
import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export default function MembershipPage() {
    return (
        <Box sx={{ py: 6, px: { xs: 2, sm: 4 } }}>
            <Typography variant="h3" gutterBottom textAlign="center">Membership Comparison</Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>See what&apos;s included in each tier. Premium+ is coming soon!</Typography>

            <Box sx={{ textAlign: "center", mb: 4}}>
                <Typography variant="body1" gutterBottom>Pledge your support on Patreon to gain access to the Realm&apos;s secrets.</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.patreon.com/RealmFoundry"
                > 
                    Join as Alpha Adventurer 
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Feature</strong></TableCell>
                            <TableCell align="center"><strong>Free</strong></TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderTop: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            backgroundColor: (theme) => theme.palette.secondary.main,
                                            color: "#fff",
                                            px: 1.2,
                                            py: 0.3,
                                            borderRadius: "12px",
                                            fontSize: "0.7rem",
                                            fontWeight: 600,
                                            mb: 0.5,
                                            textTransform: "uppercase",
                                            letterSpacing: 0.5,
                                        }}
                                    >
                                        Recommended
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">Premium</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Premium+</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Number of Settlements</TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                Unlimited
                            </TableCell>
                            <TableCell align="center">Unlimited</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Number of Sites</TableCell>
                            <TableCell align="center">15</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                Unlimited
                            </TableCell>
                            <TableCell align="center">Unlimited</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Number of NPCs</TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                Unlimited
                            </TableCell>
                            <TableCell align="center">Unlimited</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Themed Options</TableCell>
                            <TableCell align="center">Medieval fantasy</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                Multiple themes + custom options&nbsp;<Typography variant="caption">(coming soon!)</Typography>
                            </TableCell>
                            <TableCell align="center">Premium + early access</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Collaboration / Sharing</TableCell>
                            <TableCell align="center">Player sharing</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                Co-GM & Player sharing
                            </TableCell>
                            <TableCell align="center">Same as Premium</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Batch Generation</TableCell>
                            <TableCell align="center">✕</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                Basic batch&nbsp;<Typography variant="caption">(coming soon!)</Typography>
                            </TableCell>
                            <TableCell align="center">Advanced batch</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Export Options</TableCell>
                            <TableCell align="center">✕</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                PDF, VTT, etc.&nbsp;<Typography variant="caption">(coming soon!)</Typography>
                            </TableCell>
                            <TableCell align="center">Premium + handouts</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Beta / Early Access</TableCell>
                            <TableCell align="center">✕</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                ✕
                            </TableCell>
                            <TableCell align="center">✔️</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Exclusive Content</TableCell>
                            <TableCell align="center">✕</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                ✕
                            </TableCell>
                            <TableCell align="center">✔️</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Community & Networking</TableCell>
                            <TableCell align="center">✕</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.secondary.light + "22"
                                        : theme.palette.secondary.dark + "22",
                                    borderLeft: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderRight: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    borderBottom: (theme) => `2px solid ${theme.palette.secondary.main}`,
                                    fontWeight: "bold",
                                    position: "relative",
                                }}
                            >
                                ✕
                            </TableCell>
                            <TableCell align="center">✔️</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <PatreonCta />
        </Box>
    );
}