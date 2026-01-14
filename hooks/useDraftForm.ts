import { useEffect, useRef } from "react";

type DraftFormOptions<T> = {
  user: any;
  draftItem: Partial<T> | null;
  setDraftItem: (draft: Partial<T>) => void;
  clearDraftItem: () => void;
  submittingDraft: boolean;
  setSubmittingDraft: (value: boolean) => void;
  onSubmit: (data: T) => Promise<string | undefined>;
  draftKey?: string;
};

export function useDraftForm<T>({
  user,
  draftItem,
  setDraftItem,
  clearDraftItem,
  submittingDraft,
  setSubmittingDraft,
  onSubmit,
  draftKey = "draftData",
}: DraftFormOptions<T>) {
  const hasSubmittedDraftRef = useRef(false);

  // Restore draft from sessionStorage synchronously (important for OAuth redirects)
  let initialDraft: Partial<T> | null = null;
  if (typeof window !== "undefined" && draftKey) {
    const raw = sessionStorage.getItem(draftKey);
    if (raw) initialDraft = JSON.parse(raw) as Partial<T>;
  }

  // Auto-submit draft after login
  useEffect(() => {
    if (!user || !draftItem || submittingDraft || hasSubmittedDraftRef.current) return;

    hasSubmittedDraftRef.current = true;
    setSubmittingDraft(true);

    (async () => {
      try {
        const result = await onSubmit(draftItem as T);
        if (result) {
          clearDraftItem();
          if (draftKey) sessionStorage.removeItem(draftKey);
        }
      } finally {
        setSubmittingDraft(false);
        hasSubmittedDraftRef.current = false;
      }
    })();
  }, [user, draftItem, submittingDraft, onSubmit, clearDraftItem, setSubmittingDraft, draftKey]);

  // Helper for saving draft before login
  const saveDraftAndPromptLogin = (data: T, openLogin: (props?: any) => void) => {
    setDraftItem(data);
    if (draftKey) sessionStorage.setItem(draftKey, JSON.stringify(data));
    openLogin({ draftKey, draftItem: data });
  };

  return { initialDraft, saveDraftAndPromptLogin };
}
