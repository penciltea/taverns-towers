'use client';

import { useEffect } from "react";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { userSchema } from "@/schemas/user.schema";
import { useUserContentStore } from "@/store/userStore";

export function useUserProfileForm() {
  const { mode, draftItem } = useUserContentStore();

  const methods = useFormWithSchema(userSchema);


  useEffect(() => {
  if (mode === "edit" && draftItem) {
    methods.reset({
      ...draftItem
    });
  }
}, [mode, draftItem, methods.reset]);

  return methods;
}