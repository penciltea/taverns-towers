import { Box } from "@mui/material";
import Header from "@/components/Layout/Header";
import Snackbar from '@/components/Common/Snackbar';
import ErrorDialog from "@/components/Common/ErrorDialog";
import DialogContainer from "@/components/Layout/DialogContainer";
import AppProviderWrapper from "@/components/Layout/AppProviderWrapper";
import AuthSync from "@/components/Layout/AuthSync";

export const metadata = {
  title: "RealmFoundry",
  description: "A world builder for your TTRPG campaigns",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      
      <body>
        <AppProviderWrapper>
          <AuthSync />
          <Snackbar />
          <ErrorDialog />
          <Header />
          <Box sx={{ display: 'flex', paddingTop: { xs: '28vh', sm: '80px', md: '100px' } }}>
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
