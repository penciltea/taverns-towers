import { useEffect } from "react";

export function useFormMode<T>(
  id: string | undefined,
  useStore: () => {
    setMode: (mode: "add" | "edit") => void;
    setSelectedItem: (item: T) => void;
    clearMode: () => void;
    clearSelectedItem: () => void;
  },
  fetchItemById: (id: string) => Promise<T>
) {
  const { setMode, setSelectedItem, clearMode, clearSelectedItem } = useStore();

  useEffect(() => {
    if (id) {
      setMode("edit");
      fetchItemById(id).then(setSelectedItem);
    } else {
      setMode("add");
      clearSelectedItem();
    }

    return () => {
      clearMode();
      clearSelectedItem();
    };
  }, [id]);
}
