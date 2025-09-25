import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { signIn } from "next-auth/react";

export function usePatreonLink() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { showSnackbar, showErrorDialog, setSubmitting } = useUIStore();

  /**
   * Initiates Patreon linking.
   */
  function linkPatreon() {
    if (!user) return showErrorDialog("No user session found.");

    signIn("patreon", {
      callbackUrl: `/account/dashboard?linkUserId=${user.id}`
    });
  }

  /**
   * Unlinks the currently linked Patreon account via your API.
   */
  async function unlinkPatreon(patreonAccountId: string) {
    if (!user) return showErrorDialog("No user session found.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/user/unlink-patreon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, patreonAccountId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Failed to unlink Patreon account.");

      setUser({ ...user, patreon: undefined });
      showSnackbar("Patreon account unlinked successfully.", "success");
    } catch (err) {
      showErrorDialog(err instanceof Error ? err.message : "Failed to unlink Patreon account.");
    } finally {
      setSubmitting(false);
    }
  }

  return { linkPatreon, unlinkPatreon };
}