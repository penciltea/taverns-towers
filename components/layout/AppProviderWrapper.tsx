"use client"

import theme from "@/lib/muiTheme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import QueryProviderWrapper from "./QueryProviderWrapper";
import { useUIStore } from "@/store/uiStore";
import { lightTheme, darkTheme } from "@/lib/theme";

interface AppProviderWrapperProps {
  children: React.ReactNode;
  session: Session | null; // session can be null if not authenticated
}

export default function AppProviderWrapper({ children, session }: AppProviderWrapperProps){
    const themeName = useUIStore((state) => state.theme);

  const theme = themeName === 'light' ? lightTheme :
                themeName === 'dark' ? darkTheme :
                lightTheme;
                
    return (
        <SessionProvider session={session}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <QueryProviderWrapper>
                        {children}
                    </QueryProviderWrapper>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </SessionProvider>
    )
}