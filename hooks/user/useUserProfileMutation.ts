'use client'

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { UpdateUserPayload } from "@/interfaces/user.interface";
import { UserUpdateSchema } from "@/schemas/user.schema";
import { useAuthStore } from "@/store/authStore";
import { handleActionResult } from "../queryHook.util";
import { AppError } from "@/lib/errors/app-error";

export function useUserProfileMutation() {
    const router = useRouter();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const setUser = useAuthStore((state) => state.setUser);

    async function handleSubmit(data: UserUpdateSchema) {
        setSubmitting(true);

        try {
            const payload: UpdateUserPayload = {
                username: data.username,
                email: data.email,
                avatar: await handleDynamicFileUpload(data, "avatar"),
                ...(data.password ? { password: data.password } : {}),
            };
            const { updateUser } = await import("@/lib/actions/user.actions");
            const response = await updateUser(payload);
            const res = handleActionResult(response);

            if (!res.success) throw new AppError("There was a problem updating your profile.", 500);

            // Refetch the latest user from the server to ensure UI & Zustand are fully up-to-date
            const { refreshUserSession } = await import("@/lib/actions/user.actions");
            const result = await refreshUserSession(res.user.id);
            const latestUser = handleActionResult(result);

            if (latestUser) {
                setUser(latestUser);
            }

            showSnackbar("Profile updated successfully!", "success");
            router.push('/account/dashboard');
        } catch (err) {
            showErrorDialog(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    return { handleSubmit };
}
