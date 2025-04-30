import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useTownContentStore } from "@/store/townStore";
import { createTown, updateTown } from "@/lib/actions/town.actions";
import { transformTownFormData } from "@/lib/util/transformFormDataForDB";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { TownFormData } from "@/schemas/townSchema";
import { useQueryClient } from "@tanstack/react-query";

type SaveTownMutationProps = {
  id?: string;
  mode: "add" | "edit";
};

export function useSaveTownMutation({ id, mode }: SaveTownMutationProps) {
  const router = useRouter();
  const { showSnackbar, setSubmitting } = useUIStore();
  const { clearSelectedItem, clearMode } = useTownContentStore();
  const queryClient = useQueryClient();

  const saveTown = async (data: TownFormData) => {
    setSubmitting(true);
    try {
      const cleanMap = await handleDynamicFileUpload(data, "map");

      if (Array.isArray(data.tags)) {
        data.tags = data.tags.filter(tag => tag.trim() !== "");
      }

      const townData = {
        ...transformTownFormData(data),
        map: cleanMap,
      };

      let savedTown;
      if (mode === "edit" && id) {
        savedTown = await updateTown(id, townData);
      } else {
        savedTown = await createTown(townData);
      }

      showSnackbar(
        mode === "edit" ? "Town updated successfully!" : "Town created successfully!",
        "success"
      );

      clearSelectedItem();
      clearMode();
      queryClient.invalidateQueries({ queryKey: ['towns'] });
      router.push(`/towns/${savedTown._id}`);
    } catch (error) {
      console.error(error);
      showSnackbar("Something went wrong, please try again later!", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return { saveTown };
}
