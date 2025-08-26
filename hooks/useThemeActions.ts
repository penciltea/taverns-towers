'use client'

import { useSession } from "next-auth/react";
import { UIState } from "@/interfaces/ui.interface";
import { updateUserTheme } from "@/lib/actions/user.actions";
import { useUIStore } from "@/store/uiStore";

export default function useThemeActions(){
  const setTheme = useUIStore((state) => state.setTheme);
  const { data: session } = useSession();

  const user = session?.user ? { id: session.user.id } : null;

  const updateTheme = async (theme: UIState['theme']) => {
    setTheme(theme);

    if (user) {
      await updateUserTheme(user.id, theme);
    }
  };

  return { updateTheme };
};