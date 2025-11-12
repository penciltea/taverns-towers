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
      const { unlinkPatreonAccount } = await import("@/lib/actions/user.actions");
      const result = await unlinkPatreonAccount(user.id, patreonAccountId);

      if (!result.success) throw new Error(result.error ?? "Failed to unlink Patreon account.");

      setUser({ ...user, patreon: undefined });
      showSnackbar("Patreon account unlinked successfully. You may need to log back in to see your changes.", "success");
    } catch (err) {
      showErrorDialog(err instanceof Error ? err.message : "Failed to unlink Patreon account.");
    } finally {
      setSubmitting(false);
    }
  }

  return { linkPatreon, unlinkPatreon };
}