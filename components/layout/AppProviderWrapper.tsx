"use client"

import theme from "@/lib/muiTheme"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import QueryProviderWrapper from "./QueryProviderWrapper"

export default function AppProviderRouter({ children }: { children: React.ReactNode }){
    return (
        <SessionProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryProviderWrapper>
            {children}
            </QueryProviderWrapper>
        </ThemeProvider>
        </SessionProvider>
    )
}