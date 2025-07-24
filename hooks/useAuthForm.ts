import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "@/lib/actions/user.actions";
import { useUIStore } from "@/store/uiStore";
import { RegisterPayload, LoginPayload } from "@/interfaces/user.interface";
import { signIn } from "next-auth/react";

type AuthFormType = "login" | "register";

type AuthPayload<T extends AuthFormType> = 
  T extends "register" ? RegisterPayload : LoginPayload;

interface AuthFormOptions<T extends AuthFormType> {
  type: T;
  redirectTo?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useAuthForm<T extends AuthFormType>(options: AuthFormOptions<T>) {
  const { type, redirectTo, onSuccess, onError } = options;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useUIStore.getState();

  const submit = async (data: AuthPayload<T>) => {
    setLoading(true);
    setError(null);

    try {
      let finalRedirect = redirectTo;

      if (type === "register") {
        const result = await registerUser(data as RegisterPayload);
        finalRedirect ??= "/auth/login";

        if (result.success) {
          showSnackbar("Your scroll has been scribed! Proceed to the sign-in gate.", "success");
          onSuccess?.();
          router.push(finalRedirect);
        } else {
          const message = result.error ?? "Something went wrong.";
          setError(message);
          onError?.(message);
        }
      } else if (type === "login") {
        finalRedirect ??= "/account/dashboard";
        const result = await signIn("credentials", {
          redirect: false,
          callbackUrl: finalRedirect,
          credential: (data as LoginPayload).credential,
          password: (data as LoginPayload).password,
        });

        if (result?.ok) {
          showSnackbar("Welcome back, traveler.", "success");
          onSuccess?.();
          router.push(finalRedirect!);
        } else {
          const message = result?.error ?? "Invalid login credentials.";
          setError(message);
          onError?.(message);
        }
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
