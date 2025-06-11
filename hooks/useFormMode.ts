import { useEffect } from "react";

export function useFormMode<T>(
  id: string | undefined,
  useStore: () => {
    setMode: (mode: "add" | "edit") => void;
    clearMode: () => void;
    clearSelectedItem: () => void;
  }
) {
  const { setMode, clearMode, clearSelectedItem } = useStore();

  useEffect(() => {
    if (id) {
      setMode("edit");
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
