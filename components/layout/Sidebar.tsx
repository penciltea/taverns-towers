"use client";

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


const drawerWidth = 240;
const navItems = [
    { label: "Settlements", path: "/settlements/all", disabled: false },
    { label: "Sites", path: "/sites", disabled: false },
    { label: "NPCs", path: "/npcs", disabled: true },
    { label: "Guilds", path: "/guilds", disabled: true }
];

export const Sidebar = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
    const closeDrawer = useUIStore((state) => state.closeDrawer);

    const handleNavigation = (path: string, disabled: boolean) => {
        if (disabled) return;
        router.push(path);
        if (isMobile) closeDrawer();
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
        <List>
            {navItems.map(({ label, path, disabled }) => (
            <ListItem key={label} disablePadding>
                <ListItemButton
                onClick={() => handleNavigation(path, disabled)}
                disabled={disabled}
                >
                <ListItemText primary={label} />
                </ListItemButton>
            </ListItem>
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
