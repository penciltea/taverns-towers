import { Box } from "@mui/material";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Taverns & Towers",
  description: "A town builder for your TTRPG campaigns",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Box sx={{display: 'flex'}}>
          <Sidebar />
          <Box component="main" sx={{flexGrow: 1, p: 3}}>
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
