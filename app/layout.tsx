import Snackbar from '@/components/Common/Snackbar';
import ErrorDialog from "@/components/Common/Dialog/ErrorDialog";
import DialogContainer from "@/components/Layout/DialogContainer";
import AppProviderWrapper from "@/components/Layout/AppProviderWrapper";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth';
import AuthSync from '@/components/Auth/AuthSync';
import { UITheme } from '@/constants/ui.options';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "RealmFoundry",
  description: "A world builder for your TTRPG campaigns.",
  manifest: "/manifest.json",
  themeColor: "#ffffff",

  // Good for SEO
  keywords: [
    "world building",
    "ttrpg tools",
    "campaign management",
    "dnd tools",
    "realm foundry",
    "tabletop rpg world builder",
  ],

  // Social previews (Discord, Slack, Facebook, etc.)
  openGraph: {
    title: "RealmFoundry",
    description: "A world builder for your TTRPG campaigns.",
    url: "https://www.realmfoundry.app",
    siteName: "RealmFoundry",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RealmFoundry screenshot",
      },
    ],
    type: "website",
  },

  // Twitter / X previews
  twitter: {
    card: "summary_large_image",
    title: "RealmFoundry",
    description: "A world builder for your TTRPG campaigns.",
    creator: "@realmfoundry",
    images: ["/og.png"],
  },

  // Helpful for mobile browsers and PWAs
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RealmFoundry",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  const initialTheme = (session?.user?.theme as UITheme) ?? 'dark';

  return (
    <html lang="en">
      
      <body>
        <AppProviderWrapper session={session} initialTheme={initialTheme}>
          <Analytics />
          <SpeedInsights />
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
