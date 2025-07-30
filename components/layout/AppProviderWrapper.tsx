"use client"

import theme from "@/lib/muiTheme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import QueryProviderWrapper from "./QueryProviderWrapper";

interface AppProviderWrapperProps {
  children: React.ReactNode;
  session: Session | null; // session can be null if not authenticated
}

export default function AppProviderWrapper({ children, session }: AppProviderWrapperProps){
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