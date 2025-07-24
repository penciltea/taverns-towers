import { Box } from "@mui/material";
import Header from "@/components/Layout/Header";
import Snackbar from '@/components/Common/Snackbar';
import ErrorDialog from "@/components/Common/ErrorDialog";
import DialogContainer from "@/components/Layout/DialogContainer";
import AppProviderWrapper from "@/components/Layout/AppProviderWrapper";

export const metadata = {
  title: "Taverns & Towers",
  description: "A settlement builder for your TTRPG campaigns",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      
      <body>
        <AppProviderWrapper>
          <Snackbar />
          <ErrorDialog />
          <Header />
          <Box sx={{ display: 'flex', paddingTop: { xs: '15vh', sm: '40px', md: '60px' } }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
            </Box>
          </Box>
          <DialogContainer />
        </AppProviderWrapper>
      </body>
    </html>
  );
}
