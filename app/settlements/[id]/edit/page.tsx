"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, SettlementFormData, defaultSettlementValues } from "@/schemas/settlement.schema";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { normalizeSettlementData } from "@/lib/util/normalizeSettlementData";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";
import { useSettlementQuery } from "@/hooks/settlement/settlement.query";
import { useSettlementFormSetup } from "@/hooks/settlement/useSettlementFormSetup";
import { useFormMode } from "@/hooks/useFormMode";
import { NpcConnection } from "@/interfaces/connection.interface";
import { Typography } from "@mui/material";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { Npc } from "@/interfaces/npc.interface";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";

function useNpcMap() {
  const { data: npcs,  } = useOwnedNpcsQuery({}, { isEnabled: true });

  const npcMap = useMemo(() => {
    if (!npcs) return new Map<string, Npc>();
    return new Map<string, Npc>(npcs.npcs.map((npc) => [npc._id, npc]));
  }, [npcs]);

  return npcMap;
}


export default function EditSettlementFormPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);
  const [initialConnections, setInitialConnections] = useState<NpcConnection[]>([]);


  useFormMode(safeId, useSettlementContentStore);
  const { mode } = useSettlementContentStore();

  const { showErrorDialog, setOpenDialog, closeDialog } = useUIStore();
  const { setSelectedItem, clearSelectedItem } = useSettlementContentStore();
  
  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues
  });

  const { data: settlement, isLoading, error } = useSettlementQuery(safeId ?? null);

  const { onGenerate, onReroll, onSubmit } = useSettlementFormSetup(methods, safeId ?? null, mode ?? "edit");

  const npcMap = useNpcMap();
  

  // Update Zustand and reset form when data arrives
  useEffect(() => {
    if (isLoading) return;
    
    if(settlement){
      setSelectedItem(settlement);
      setInitialConnections(settlement.connections);

      const mergedSettlement = normalizeSettlementData({
        ...defaultSettlementValues,
        ...settlement
      }) as SettlementFormData;

      methods.reset(mergedSettlement);
    } else if(safeId && !isLoading){
      // If no settlement, clear selection
      clearSelectedItem();
      showErrorDialog("Settlement could not be found, please try again later!")

    }
  }, [settlement, isLoading, safeId, setSelectedItem, clearSelectedItem, methods, showErrorDialog]);

  function findDeletedConnections(
    initial: NpcConnection[],
    current: NpcConnection[]
  ) {
    const currentIds = new Set(current.map(c => c.id));
    return initial.filter(c => !currentIds.has(c.id));
  }


  

  const wrappedSubmit = async (data: SettlementFormData) => {
    const deletedConnections = findDeletedConnections(initialConnections, data.connections);
    console.log("deleted: ", deletedConnections);

    console.log("length: ", deletedConnections.length);

    if (deletedConnections.length > 0) {
      setOpenDialog('deleteConfirmationDialog', {
        title: "Confirm Deleting Connections",
        deleteText: "Confirm",
        message: (
          <>
            <Typography>The following connections will be deleted when you save this data:</Typography>
            <ul>
              {deletedConnections.map((conn) => {
                const baseName =
                  conn.type === "npc"
                    ? npcMap.get(conn.id)?.name ||
                      conn.label ||
                      conn.id
                    : conn.label || conn.id;

                const formatted = conn.role
                  ? `${baseName}: ${capitalizeFirstLetter(conn.role)}`
                  : baseName;

                return <li key={conn.id}>{formatted}</li>;
              })}
            </ul>
          </>
        ),
        onConfirm: async () => {
          // Call your delete connection API for each item
          // for (const conn of deletedConnections) {
          //   await deleteConnection(conn.id); // you’d need to implement this
          // }

          await onSubmit(data);
          closeDialog();
        },
        onClose: () => {
          closeDialog();
        },
        deleting: "connections",
      });
    } else {
      await onSubmit(data);
    }
  };

  if (error) {
    return (
      <div className="error-message">
        Error loading settlement: {error.message}
      </div>
    );
  }

  return (
    <SkeletonLoader loading={isLoading} skeleton={<Spinner />}>
      <FormProvider {...methods}>
        <SettlementForm onSubmit={wrappedSubmit} mode={mode} onGenerate={onGenerate} onReroll={onReroll} />
      </FormProvider>
    </SkeletonLoader>
  );
}
