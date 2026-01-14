'use client'

import { Box } from "@mui/material"
import { Sidebar } from "./Sidebar"
import { useUIStore } from "@/store/uiStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import Header from "./Header";
import EmailVerificationBanner from "./EmailVerificationBanner";
import { useAuthStore } from "@/store/authStore";

export default function LayoutWrapper({ children }: { children: React.ReactNode }){
    const isMobile = useIsMobile();
    const isDrawerOpen = useUIStore(state => state.isDrawerOpen);
    const user = useAuthStore((state) => state.user);
    const drawerWidth = 240;

    return (
        <>
            <Header />
            <Sidebar />

            <Box sx={{ display: 'flex', paddingTop: { xs: user ? '12vh' : '18vh', sm: '80px', md: '60px' } }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, sm: 3 },
                        transition: 'margin 0.3s',
                        marginLeft: !isMobile && isDrawerOpen ? `${drawerWidth}px` : 0,
                    }}
                >
                    <EmailVerificationBanner />
                    {children}
                </Box>
            </Box>
        </>
    )
}