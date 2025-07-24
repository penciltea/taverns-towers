import { Box } from "@mui/material";
import Header from "@/components/Layout/Header";
import Snackbar from '@/components/Common/Snackbar';
import ErrorDialog from "@/components/Common/ErrorDialog";
import DialogContainer from "@/components/Layout/DialogContainer";
import AppProviderWrapper from "@/components/Layout/AppProviderWrapper";
import AuthSync from "@/components/Layout/AuthSync";
import { Sidebar } from "@/components/Layout/Sidebar";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";

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
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <DialogContainer />
        </AppProviderWrapper>
      </body>
    </html>
  );
}
