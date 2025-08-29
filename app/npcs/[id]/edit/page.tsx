"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useNpcContentStore } from "@/store/npc.store";
import { useNpcForm } from "@/hooks/npc/useNpcForm";
import { useFormMode } from "@/hooks/useFormMode";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { useGetNpcById } from "@/hooks/npc/npc.query";
import NpcForm from "@/components/Npc/Form/NpcForm";
import { getSingleParam } from "@/lib/util/getSingleParam";
import { NpcFormData } from "@/schemas/npc.schema";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";
import { useNpcGeneratorActions } from "@/hooks/npc/useNpcGeneratorActions";
import { Paper } from "@mui/material";
import { useHandleDeletedConnections } from "@/hooks/connection/useHandleDeletedConnections";
import { NpcConnection } from "@/interfaces/connection.interface";
import { useUIStore } from "@/store/uiStore";

export default function EditNpcPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);
  const [initialConnections, setInitialConnections] = useState<NpcConnection[]>([]);

  const { mode, setSelectedItem, clearSelectedItem } = useNpcContentStore();
  const { showErrorDialog } = useUIStore();
  const methods = useNpcForm();
  const { handleSubmit } = useNpcMutations({ mode, npcId: safeId });

  const { data: npc, isLoading, isError } = useGetNpcById(safeId ?? '');

  useFormMode(safeId, useNpcContentStore); // set mode to 'edit' and load store draft

  const { name: generateName, missing: generateMissing, reroll: rerollAll } = useNpcGeneratorActions(methods);
  const { handleDeletedConnections } = useHandleDeletedConnections<NpcFormData>("npc");
    
  
  const generator = {
    name: generateName,
    missing: generateMissing,
    reroll: rerollAll,
  };

  // Once NPC is fetched, hydrate store
  useEffect(() => {
    if (isLoading) return;
    
    if (npc) {
      setSelectedItem(npc); // update the store
      setInitialConnections(npc.connections);
      methods.reset(npc);   // reset the form with the loaded data
    } else if(safeId && !isLoading){
      // If no NPC, clear selection
      clearSelectedItem();
      showErrorDialog("NPC could not be found, please try again later!");
    }
  }, [npc, safeId, isLoading, setSelectedItem, clearSelectedItem, methods, showErrorDialog]);

  const wrappedSubmit = async (data: NpcFormData) => {
    const normalizedConnections = Array.isArray(data.connections) ? data.connections : [];

      await handleDeletedConnections({
        sourceId: safeId ?? "",
        initialConnections,
        currentConnections: data.connections,
        formData: data,
        onConfirm: async (formData) => {
          await handleSubmit(formData);
        },
      });

      // Update initialConnections so next deletion is correct
      setInitialConnections(normalizedConnections);
  };

  if (isLoading) return <p>Loading NPC...</p>;
  if (isError || !npc) return <p>NPC not found or failed to load.</p>;

  return (
    <SkeletonLoader loading={isLoading} skeleton={<Spinner />}>
        <FormProvider {...methods}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
            <NpcForm
              onSubmit={wrappedSubmit}
              generator={generator}
              mode={mode}
            />
          </Paper>
        </FormProvider>
    </SkeletonLoader>
  );
}
