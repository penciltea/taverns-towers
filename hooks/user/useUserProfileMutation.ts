'use client'

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { UpdateUserPayload } from "@/interfaces/user.interface";
import { updateUser } from "@/lib/actions/user.actions";
import { UserUpdateSchema } from "@/schemas/user.schema";
import { useAuthStore } from "@/store/authStore";

export function useUserProfileMutation() {
    const router = useRouter();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const setUser = useAuthStore((state) => state.setUser);

    async function handleSubmit(data: UserUpdateSchema) {
        setSubmitting(true);

        try {
            // Only include password if user actually typed one
            const payload: UpdateUserPayload = {
                username: data.username,
                email: data.email,
                avatar: await handleDynamicFileUpload(data, "avatar"),
                ...(data.password ? { password: data.password } : {}),
            };

            const res = await updateUser(payload);

            if (!res.success) throw new Error(res.error || "Failed to update profile");

            // Update AuthStore so UI reflects changes immediately
            setUser({
                ...res.user, // returned updated user object from backend
            });

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
