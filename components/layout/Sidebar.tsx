"use client";

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Sidebar = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { setOpenDialog } = useUIStore();
    const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
    const closeDrawer = useUIStore((state) => state.closeDrawer);

    const drawerWidth = 240;
    const navItems = [
        {
            label: "Settlements",
            children: [
            {
                label: "View all settlements",
                path: "/settlements/all",
                enabled: true
            },
            {
                label: "Create settlement",
                enabled: true,
                path: "/settlements/new"
            }
            ]
        },
        {
            label: "Sites",
            children: [
            {
                label: "View all sites",
                path: "/sites",
                enabled: true
            },
            {
                label: "Create site",
                enabled: true,
                onClick: () =>
                setOpenDialog("siteTypeDialog", {
                    dialogMode: "global"
                })
            }
            ]
        },
        {
            label: "NPCs",
            children: [
                {
                    label: "View all NPCs",
                    path: "/npcs",
                    enabled: false
                },
            ]
        },
        {
            label: "Guilds",
            children: [
                {
                    label: "View all Guilds",
                    path: "/guilds",
                    enabled: false
                },
            ]
        }
    ];

    const handleNavigation = (
        path?: string,
        enabled?: boolean,
        onClick?: () => void
    ) => {
        if (!enabled) return;
        if (onClick) {
            onClick();
        } else if (path) {
            router.push(path);
            if (isMobile) closeDrawer();
        }
    };

    const drawerContent = (
        <Box sx={{ width: drawerWidth, paddingTop: { xs: '7vh', sm: '40px', md: '60px' } }} role="presentation">
        <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <Typography variant="h6">Navigation</Typography>
            {!isMobile && (
            <IconButton onClick={closeDrawer} aria-label="close navigation">
                <ChevronLeftIcon />
            </IconButton>
            )}
        </Box>
        <List disablePadding>
            {navItems.map((item) => (
            <Accordion key={item.label} disableGutters elevation={0} square>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{item.label}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ py: 0 }}>
                {item.children.map((child) => (
                    <ListItemButton
                        key={child.label}
                        onClick={() =>
                            handleNavigation(child.path, child.enabled, child.onClick)
                        }
                        disabled={!child.enabled}
                    >
                        <ListItemText primary={child.label} />
                    </ListItemButton>
                ))}
                </AccordionDetails>
            </Accordion>
            ))}
        </List>
        </Box>
    );

    return (
        <Box
        component="nav"
        sx={{ width: { sm: isDrawerOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
        >
        {/* Mobile Drawer */}
        <Drawer
            variant="temporary"
            open={isDrawerOpen && isMobile}
            onClose={closeDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth }
            }}
        >
            {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
            variant="persistent"
            open={isDrawerOpen && !isMobile}
            sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" }
            }}
        >
            {drawerContent}
        </Drawer>
        </Box>
    );
};
