"use client";

import { useUIStore } from "@/store/uiStore";
import { useEffect } from "react";
import { lightTheme, darkTheme } from "@/lib/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import QueryProviderWrapper from "./QueryProviderWrapper";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { UITheme } from "@/constants/ui.options";
import { Session } from "next-auth";

interface AppProviderWrapperProps {
  children: React.ReactNode;
  session: Session | null;
  initialTheme: UITheme; // from server session
}

export default function AppProviderWrapper({ children, session, initialTheme }: AppProviderWrapperProps) {
  const themeName = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  // Hydrate Zustand theme from localStorage without blocking initial paint
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') as UITheme | null : null;
    if (stored) {
      setTheme(stored);
    } else if (initialTheme) {
      setTheme(initialTheme);
    }
  }, [initialTheme, setTheme]);

  // Use Zustand theme if available, otherwise fallback to initialTheme
  const activeTheme = themeName
    ? themeName === 'light' ? lightTheme : darkTheme
    : initialTheme === 'light'
      ? lightTheme
      : darkTheme;

  return (
    <SessionProvider session={session}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={activeTheme}>
          <CssBaseline />
          <QueryProviderWrapper>
            {children}
          </QueryProviderWrapper>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}
