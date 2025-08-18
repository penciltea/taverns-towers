/**
 * Hook: useSettlementFormSetup
 *
 * Connects form methods to generation, save logic, UI feedback, and store cleanup.
 * Returns ready-to-use form callbacks: onGenerate, onReroll, onSubmit.
 */

"use client"

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useQueryClient } from "@tanstack/react-query";
import { useSaveSettlement } from "./useSaveSettlement";
import { useSettlementGeneratorActions } from "./useSettlementGeneratorActions";
import { shouldReplace } from "@/lib/util/randomValues";
import { SettlementFormData } from "@/schemas/settlement.schema";
import { UseFormReturn } from "react-hook-form";
import { addConnection } from "@/lib/actions/connections.actions";
import { invalidateConnections } from "@/lib/util/invalidateQuery";

export function useSettlementFormSetup(
  methods: UseFormReturn<SettlementFormData>,
  id: string | null,
  mode: "add" | "edit"
) {
  const router = useRouter();
  const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
  const { clearSelectedItem, clearMode } = useSettlementContentStore();
  const queryClient = useQueryClient();

  const { generatePartial, generateFull } = useSettlementGeneratorActions();
  const saveSettlement = useSaveSettlement(mode, id ?? undefined);

  /**
   * Generate missing or random values only, preserving existing form data.
   */
  const onGenerate = async () => {
    const currentValues = methods.watch();
    const generated = await generatePartial(currentValues);

    Object.entries(generated).forEach(([key, value]) => {
      const currentVal = currentValues[key as keyof SettlementFormData];
      if (shouldReplace(currentVal) && value !== undefined && value !== "") {
        methods.setValue(key as keyof SettlementFormData, value);
      }
    });
  };

  /**
   * Replaces all form values with newly generated data.
   */
  const onReroll = async () => {
    const generated = await generateFull();
    methods.reset(generated);
  };

  /**
   * Submits the form to save or update a settlement.
   * Handles error feedback, store reset, cache refresh, and routing.
   */
  const onSubmit = async (data: SettlementFormData) => {
    setSubmitting(true);

    try {
      const saved = await saveSettlement(data);

      if (data.connections?.length) {
        for (const conn of data.connections) {
          await addConnection({
              sourceType: "settlement",
              sourceId: saved._id,
              targetType: conn.type,
              targetId: conn.id,
              role: conn.role,
          });

          queryClient.setQueryData([conn.type, conn.id], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              connections: [
                ...old.connections,
                { type: "settlement", refId: saved._id, role: conn.role },
              ],
            };
          });
        }

        invalidateConnections(queryClient, data.connections);
      }

      showSnackbar(
        mode === "edit" ? "Settlement updated successfully!" : "Settlement created successfully!",
        "success"
      );

      clearSelectedItem();
      clearMode();
      queryClient.invalidateQueries({ queryKey: ["ownedSettlements"] });

      if (saved?._id) {
        router.push(`/settlements/${saved._id}`);
      }
    } catch (error) {
      showErrorDialog("Something went wrong saving the settlement. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    onGenerate,
    onReroll,
    onSubmit,
  };
}
