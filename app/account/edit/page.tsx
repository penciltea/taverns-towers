'use client'

import { FormProvider } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { useAuthStore } from "@/store/authStore";
import { useUserProfileForm } from "@/hooks/user/useUserProfileForm"; // form hook (react-hook-form setup)
import { useUserProfileMutation } from "@/hooks/user/useUserProfileMutation";
import ProfileForm from "@/components/Dashboard/Account/ProfileForm";
import AuthGate from "@/components/Auth/AuthGuard";
import { useUserContentStore } from "@/store/userStore";
import { useFormMode } from "@/hooks/useFormMode";
import { UserUpdateSchema } from "@/schemas/user.schema";
import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export default function UpdateProfilePage() {
  const user = useAuthStore((state) => state.user);
  const methods = useUserProfileForm();
  const { handleSubmit: mutateSubmit } = useUserProfileMutation();
  const { isLoading, showErrorDialog } = useUIStore();
   const { setSelectedItem, clearSelectedItem } = useUserContentStore();


  useFormMode(user?.id, useUserContentStore);

   // Once NPC is fetched, hydrate store
    useEffect(() => {
      if (isLoading) return;
      
      if (user) {
        console.log("user: ", user);
        setSelectedItem(user); // update the store
        methods.reset(user);   // reset the form with the loaded data
      } else if(!isLoading){
        // If no user, clear selection
        clearSelectedItem();
        showErrorDialog("User data could not be found, please try again later!");
      }
    }, [user, isLoading, setSelectedItem, clearSelectedItem, methods, showErrorDialog]);
  

  const wrappedOnSubmit = async (data: UserUpdateSchema) => {
    if (!user) return;
    await mutateSubmit(data);
  };

  return (
    <AuthGate fallbackText="Please log in to edit your profile">
        <FormProvider {...methods}>
        <Paper
            elevation={3}
            sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 800, mx: 'auto' }}
        >
            <ProfileForm onSubmit={wrappedOnSubmit} />
        </Paper>
        </FormProvider>
    </AuthGate>
  );
}
