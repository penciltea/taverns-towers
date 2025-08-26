import Snackbar from '@/components/Common/Snackbar';
import ErrorDialog from "@/components/Common/ErrorDialog";
import DialogContainer from "@/components/Layout/DialogContainer";
import AppProviderWrapper from "@/components/Layout/AppProviderWrapper";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth';
import AuthSync from '@/components/Auth/AuthSync';
import { UITheme } from '@/constants/ui.options';

export const metadata = {
  title: "RealmFoundry",
  description: "A world builder for your TTRPG campaigns",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  const initialTheme = (session?.user?.theme as UITheme) ?? 'dark';

  return (
    <html lang="en">
      
      <body>
        <AppProviderWrapper session={session} initialTheme={initialTheme}>
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
