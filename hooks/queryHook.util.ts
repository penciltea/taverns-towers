import { ActionResult } from "@/interfaces/server-action.interface";
import { AppError } from "@/lib/errors/app-error";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function handleActionResult<T>(result: ActionResult<T>): T {
  if (result.success) return result.data;
  throw new AppError(result.message, result.status ?? 500);
}

export function useActionQuery<T>(
  key: readonly unknown[],
  action: () => Promise<ActionResult<T>>,
  options?: { enabled?: boolean; staleTime?: number }
): UseQueryResult<T, AppError> {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const result = await action();
      return handleActionResult(result);
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
  });
}