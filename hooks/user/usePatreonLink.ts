import { linkPatreonAccount, unlinkPatreonAccount } from "@/lib/actions/user.actions";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { signIn } from "next-auth/react";

export function usePatreonLink() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { showSnackbar, showErrorDialog, setSubmitting } = useUIStore();

  function startPatreonLink() {
    if (!user) return showErrorDialog("No user session found.");

    signIn("patreon");
  }

  async function completePatreonLink(patreonId: string, accessToken: string, refreshToken: string) {
    if (!user) return showErrorDialog("No user session found.");

    setSubmitting(true);
    try {
      await linkPatreonAccount(user.id, patreonId, accessToken, refreshToken);

      setUser({
        ...user,
        patreon: {
          tier: "Patron",
          accessToken,
          refreshToken,
          providerAccountId: patreonId,
        },
      });

      showSnackbar("Patreon account linked successfully!", "success");
    } catch (err) {
      showErrorDialog(err instanceof Error ? err.message : "Failed to link Patreon account.");
    } finally {
      setSubmitting(false);
    }
  }

  async function unlinkPatreon(patreonAccountId: string) {
    if (!user) return showErrorDialog("No user session found.");

    setSubmitting(true);
    try {
      const res = await unlinkPatreonAccount(user.id, patreonAccountId);
      if (!res.success) throw new Error(res.error);

      setUser({
        ...user,
        patreon: undefined,
      });

      showSnackbar("Patreon account unlinked successfully.", "success");
    } catch (err) {
      showErrorDialog(err instanceof Error ? err.message : "Failed to unlink Patreon account.");
    } finally {
      setSubmitting(false);
    }
  }

  return { startPatreonLink, completePatreonLink, unlinkPatreon };
}
