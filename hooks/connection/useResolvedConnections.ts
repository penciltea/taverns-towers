import { UseQueryResult } from "@tanstack/react-query";
import { Npc } from "@/interfaces/npc.interface";
import type { resolveConnectionNames } from "@/lib/actions/npcConnections.actions";
import { useActionQuery } from "../queryHook.util";
import { AppError } from "@/lib/errors/app-error";
import { ActionResult } from "@/interfaces/server-action.interface";

type ResolveConnectionNamesFn = typeof resolveConnectionNames;

export function useResolvedConnections(connections: Npc['connections']): UseQueryResult<ReturnType<ResolveConnectionNamesFn> extends Promise<ActionResult<infer T>> ? T : never, AppError> {
  return useActionQuery(
    ['resolvedConnections', connections],
    async () => {
      const { resolveConnectionNames } = await import('@/lib/actions/npcConnections.actions');
      return resolveConnectionNames(connections);
    },
    { staleTime: 1000 * 60 * 5 }
  );
}