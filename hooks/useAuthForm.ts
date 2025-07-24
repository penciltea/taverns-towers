import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "@/lib/actions/user.actions";
import { loginUser } from "@/lib/actions/user.actions";
import { useUIStore } from "@/store/uiStore";

type AuthFormType = "login" | "register";

interface AuthFormOptions {
  type: AuthFormType;
  redirectTo?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface AuthPayload {
  username: string;
  email: string;
  password: string;
}

export function useAuthForm(options: AuthFormOptions) {
  const { type, redirectTo, onSuccess, onError } = options;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useUIStore.getState();

  const submit = async (data: AuthPayload) => {
    setLoading(true);
    setError(null);

    try {
      let result;
      let finalRedirect = redirectTo; // allow override

      switch (type) {
        case "register":
          result = await registerUser(data);
          finalRedirect ??= "/auth/login"; // default to login after signup
          break;
        case "login":
          result = await loginUser(data);
          finalRedirect ??= "/dashboard/account"; // default after login
          break;
        default:
          throw new Error("Invalid auth type");
      }

      console.log("result: " , result);

      if (result?.success) {
         if (type === "register") {
            showSnackbar("Your scroll has been scribed! Proceed to the sign-in gate.", "success");
        } else {
            showSnackbar("Welcome back, traveler.", "success");
        }
        onSuccess?.();
        router.push(finalRedirect);
      } else {
        const message = result?.error ?? "Something went wrong.";
        setError(message);
        onError?.(message);
      }
    } catch (err) {
      const message = (err as Error).message || "Unexpected error";
      setError(message);
      onError?.(message);
    }

    setLoading(false);
  };

  return {
    submit,
    loading,
    error,
  };
}
