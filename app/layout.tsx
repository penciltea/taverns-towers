import { Box, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/muiTheme";
import Header from "@/components/layout/Header";
import Snackbar from '@/components/ui/Snackbar';

export const metadata: Metadata = {
  title: "Taverns & Towers",
  description: "A town builder for your TTRPG campaigns",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar />
        <Header />
        <Box sx={{display: 'flex', paddingTop: '60px'}}>
          <Box component="main" sx={{flexGrow: 1, p: 3}}>
            {children}
          </Box>
        </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
