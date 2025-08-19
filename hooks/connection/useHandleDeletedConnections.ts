import { useUIStore } from "@/store/uiStore";
import { NpcConnection } from "@/interfaces/connection.interface";
import findDeletedConnections from "@/lib/util/findDeletedConnections";
import { deleteConnection } from "@/lib/actions/connections.actions";
import { invalidateConnections } from "@/lib/util/invalidateQuery";
import { useQueryClient } from "@tanstack/react-query";
import useNpcMap from "@/hooks/npc/useNpcMap";
import { NpcConnectionType } from "@/constants/npc.options";

export function useHandleDeletedConnections<T extends { connections: NpcConnection[] }>(
  sourceType: NpcConnectionType
) {
  const { setOpenDialog, closeDialog } = useUIStore();
  const npcMap = useNpcMap();
  const queryClient = useQueryClient();

  async function handleDeletedConnections({
    initialConnections,
    currentConnections,
    formData,
    onConfirm,
    sourceId,
  }: {
    initialConnections: NpcConnection[];
    currentConnections: NpcConnection[];
    formData: T;
    onConfirm: (data: T) => Promise<void>;
    sourceId: string;
  }) {
    const deletedConnections = findDeletedConnections(initialConnections, currentConnections);

    if (deletedConnections.length > 0) {
      setOpenDialog("DeleteConnectionDialog", {
        deletedConnections,
        onConfirm: async () => {
          // Bidirectional deletion
          for (const conn of deletedConnections) {
            await deleteConnection({
              sourceType,
              sourceId,
              targetType: conn.type,
              targetId: conn.id,
              role: conn.role,
            });

            invalidateConnections(queryClient, formData.connections);
          }

          await onConfirm(formData);
          closeDialog();
        },
        onClose: closeDialog,
      });
    } else {
      await onConfirm(formData);
    }
  }

  return { handleDeletedConnections };
}
