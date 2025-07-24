import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "@/lib/actions/user.actions";
import { loginUser } from "@/lib/actions/user.actions";

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
  const { type, redirectTo = "/dashboard/account", onSuccess, onError } = options;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: AuthPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result =
        type === "register"
          ? await registerUser(data)
          : await loginUser(data);

          console.log("result: " , result);

      if (result?.success) {
        onSuccess?.();
        router.push(redirectTo);
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
