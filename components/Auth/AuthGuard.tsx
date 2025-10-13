"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import { Spinner } from "@/components/Common/Spinner";

interface AuthGateProps {
  children: ReactNode;
  fallbackText?: string; // customizable message
}

export default function AuthGate({ children, fallbackText = "You must be logged in to view this content." }: AuthGateProps) {
  const user = useAuthStore(state => state.user);
  const { status } = useSession();

  if (status === "loading") return <Spinner />;
  if (!user) return <Typography variant="h6" component="p">{fallbackText}</Typography>;

  return <>{children}</>;
}