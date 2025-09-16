"use client";

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThemeSwitch from "./ThemeSwitch";


export const Sidebar = () => {
    const router = useRouter();
    const isMobile = useIsMobile();

    const { setOpenDialog } = useUIStore();
    const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
    const closeDrawer = useUIStore((state) => state.closeDrawer);

    const drawerWidth = 250;
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
                    path: "/npcs/all",
                    enabled: true
                },
                {
                    label: "Create NPC",
                    enabled: true,
                    path: "/npcs/new"
                }
            ]
        },
        {
            label: "Release Info",
            children: [
                {
                    label: "All Releases",
                    path: "/releases/",
                    enabled: true
                },
                {
                    label: "Alpha Release Notes",
                    path: "/releases/alpha-25-09-03",
                    enabled: true
                },
                {
                    label: "Roadmap",
                    path: "/roadmap",
                    enabled: true
                }
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
        <Box 
            sx={{
                width: drawerWidth,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: { xs: '7vh', sm: '40px', md: '60px' }
            }}
            role="presentation"
        >
            <Box display="flex" alignItems="center" p={2}>
                <Typography variant="h6">Navigation</Typography>
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
            
            <Box sx={{ mt: "auto", p: 2 }}>
                <ThemeSwitch />
            </Box>
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
                    "& .MuiDrawer-paper": { width: drawerWidth, overflowX: 'hidden' }
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
                    "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", overflowX: 'hidden' }
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};
