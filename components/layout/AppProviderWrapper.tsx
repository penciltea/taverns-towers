"use client";

import { useUIStore } from "@/store/uiStore";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/lib/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import QueryProviderWrapper from "./QueryProviderWrapper";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { UITheme } from "@/constants/ui.options";

interface AppProviderWrapperProps {
  children: React.ReactNode;
  session: Session | null;
  initialTheme: UITheme; // from server session
}

export default function AppProviderWrapper({ children, session, initialTheme }: AppProviderWrapperProps) {
  const themeName = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on mount
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') as UITheme | null : null;
    if (stored) {
      setTheme(stored);
    } else if (initialTheme) {
      setTheme(initialTheme);
    }
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  const theme = themeName === 'light' ? lightTheme : darkTheme;

  return (
    <SessionProvider session={session}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryProviderWrapper>{children}</QueryProviderWrapper>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}
