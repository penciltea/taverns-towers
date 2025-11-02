"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import { Spinner } from "@/components/Common/Spinner";

interface AuthGateProps {
  children: ReactNode;
  fallbackText?: string; // customizable message
  allowedTiers?: string[] // which user tiers have access
  tiersMessage?: string; // customizable message for user tiers that don't have access
}

export default function AuthGate({ 
  children, 
  fallbackText = "You must be logged in to view this content.", 
  allowedTiers = ["Apprentice", "Artisan", "Architect"],
  tiersMessage = "Your membership tier does not have access to this content. Upgrade today to gain access!"
}: AuthGateProps) {
  const user = useAuthStore(state => state.user);
  const { status } = useSession();

  if (status === "loading") return <Spinner />;
  if (!user) return <Typography variant="h6" component="p">{fallbackText}</Typography>;
  if(!allowedTiers?.includes(user.tier)) return <Typography variant="h6" component="p">{tiersMessage}</Typography>;

  return <>{children}</>;
}