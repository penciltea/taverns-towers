import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/muiTheme";
import Header from "@/components/Layout/Header";
import Snackbar from '@/components/Common/Snackbar';
import ErrorDialog from "@/components/Common/ErrorDialog";
import QueryProviderWrapper from "@/components/Layout/QueryProviderWrapper";

export const metadata = {
  title: "Taverns & Towers",
  description: "A settlement builder for your TTRPG campaigns",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Snackbar />
          <ErrorDialog />
          <Header />
          <QueryProviderWrapper>
            <Box sx={{ display: 'flex', paddingTop: { xs: '15vh', sm: '40px', md: '60px' } }}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
              </Box>
            </Box>
          </QueryProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
