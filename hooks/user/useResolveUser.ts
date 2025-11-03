import { useState, useRef, useCallback } from "react";

interface ResolveResult {
  userId?: string;
  isPlaceholder: boolean;
}

export function useResolveUser(debounceMs = 300) {
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const resolve = useCallback(
    (identifier: string): Promise<ResolveResult> => {
      return new Promise((resolvePromise) => {
        // Clear any previous timer
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }

        // Trim and limit input
        const trimmed = identifier.trim().slice(0, 100);

        // Debounce the request
        debounceRef.current = setTimeout(async () => {
          setLoading(true);
          try {
            const { resolveUserId } = await import("@/lib/actions/user.actions");
            const userId = await resolveUserId(trimmed);

            resolvePromise({
              userId: userId ?? undefined,
              isPlaceholder: !userId,
            });
          } catch (err) {
            // Any error results in placeholder
            resolvePromise({ isPlaceholder: true });
          } finally {
            setLoading(false);
          }
        }, debounceMs);
      });
    },
    [debounceMs]
  );

  return { resolve, loading };
}
