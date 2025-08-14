"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useNpcContentStore } from "@/store/npc.store";
import { useAuthStore } from "@/store/authStore";
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

export default function EditNpcPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);
  const router = useRouter();

  const { mode, setSelectedItem } = useNpcContentStore();
  const user = useAuthStore((state) => state.user);
  const methods = useNpcForm();
  const { handleSubmit } = useNpcMutations({ mode, npcId: safeId });

  const { data: npc, isLoading, isError } = useGetNpcById(safeId ?? '');

  useFormMode(safeId, useNpcContentStore); // set mode to 'edit' and load store draft

  const { name: generateName, missing: generateMissing, reroll: rerollAll } = useNpcGeneratorActions(methods);
  
    const generator = {
      name: generateName,
      missing: generateMissing,
      reroll: rerollAll,
    };

  // Once NPC is fetched, hydrate store
  useEffect(() => {
    if (npc) {
      setSelectedItem(npc); // update the store
      methods.reset(npc);   // reset the form with the loaded data
    }
  }, [npc]);

  const wrappedOnSubmit = async (data: NpcFormData) => {
    await handleSubmit(data);
  };

  if (isLoading) return <p>Loading NPC...</p>;
  if (isError || !npc) return <p>NPC not found or failed to load.</p>;

  return (
    <SkeletonLoader loading={isLoading} skeleton={<Spinner />}>
        <FormProvider {...methods}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
            <NpcForm
              onSubmit={wrappedOnSubmit}
              generator={generator}
              mode={mode}
            />
          </Paper>
        </FormProvider>
    </SkeletonLoader>
  );
}
