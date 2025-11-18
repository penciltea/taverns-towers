'use client';

import { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import FormTextField from "@/components/Form/FormTextField";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { ResendVerificationSchema, resendVerificationSchema } from "@/schemas/user.schema";
import { handleActionResult } from "@/hooks/queryHook.util";

export default function ResendVerificationPage() {
    const { showSnackbar } = useUIStore();
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useFormWithSchema(resendVerificationSchema, {
        mode: "onChange",
    });

    const isTouched = !!touchedFields.credential;

    async function handleResend(data: ResendVerificationSchema) {
        setSubmitting(true);

        try {
            if(!isTouched){
                setError("Please enter a username or email address");
            }

            const { resolveUserId } = await import("@/lib/actions/user.actions");
            const userId = await resolveUserId(data.credential);
            if( userId && userId !== null){

                const { generateAndSendVerificationEmail } = await import("@/lib/actions/verification.actions")
                const response = await generateAndSendVerificationEmail(userId);
                const result = handleActionResult(response);
            
                if (result.success) {
                    showSnackbar("Verification email sent! Check your inbox.", "success");
                } else {
                    setError(result.error || "Could not resend verification email.");
                }
            } else {
                setError("There was a problem sending your verification email, please try again later.");
            }
            
        } catch (err) {
            console.error(err);
            setError("Unexpected error occurred.");
        } finally {
            setSubmitting(false);
        }
    }



    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit(handleResend)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', px: 2 }} 
        >
            <Paper sx={{ p: 4, maxWidth: 500, width: '100%', textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom>Resend Verification Email</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>Enter your email address and we&apos;ll resend the verification link.</Typography>

                {error && (
                    <Typography color="error" sx={{ fontWeight: 'bold', mb: 2 }}>{ error }</Typography>
                )}
                

                <FormTextField
                    label="Username or Email"
                    registration={register("credential")}
                    fieldError={errors.credential}
                />

                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={!isTouched}
                >
                    {isSubmitting ? "Sending..." : "Resend Email"}
                </Button>
            </Paper>
        </Box>
    );
}
