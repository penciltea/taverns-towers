import { UIState } from "@/interfaces/ui.interface";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";

export default function useThemeActions(){
  const setTheme = useUIStore((state) => state.setTheme);
  const user = useAuthStore((state) => state.user);

  const updateTheme = async (theme: UIState['theme']) => {
    setTheme(theme);

    if (user) {
      await fetch('/api/user/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }),
      });
    }
  };

  return { updateTheme };
};