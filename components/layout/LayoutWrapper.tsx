'use client'

import { Box, useMediaQuery, useTheme } from "@mui/material"
import Header from "./Header"
import { Sidebar } from "./Sidebar"
import { useUIStore } from "@/store/uiStore";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function LayoutWrapper({ children }: { children: React.ReactNode }){
    const theme = useTheme();
    const isMobile = useIsMobile();
    const isDrawerOpen = useUIStore(state => state.isDrawerOpen);
    const drawerWidth = 240;

    return (
        <>
            <Header />
            <Sidebar />

            <Box sx={{ display: 'flex', paddingTop: { xs: '7vh', sm: '40px', md: '60px' } }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        transition: 'margin 0.3s',
                        marginLeft: !isMobile && isDrawerOpen ? `${drawerWidth}px` : 0,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    )
}