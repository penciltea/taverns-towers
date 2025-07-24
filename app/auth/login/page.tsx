'use client'

import { FormTextField } from "@/components/Form";
import FormPasswordField from "@/components/Form/FormPasswordField";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { Box, Button, Paper, Typography } from "@mui/material";
import { loginSchema, LoginSchema } from "@/schemas/user.schema";


export default function LoginPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, touchedFields },
    } = useFormWithSchema(loginSchema, {
        mode: "onChange",
    });

    const password = watch("password", "");
    const isTouched = !!touchedFields.password;

    const { submit, loading, error } = useAuthForm({ type: "login" });

    const onSubmit = (data: LoginSchema) => submit(data);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: {
                        xs: "90%",
                        sm: 400,
                        md: 500,
                        lg: 600,
                    },
                    maxWidth: "100%",
                    p: 3,
                }}
            >
                <Typography variant="h3" component="h1" sx={{ marginBottom: 2 }}>Log In</Typography>
                <Typography variant="body1" component="h2" gutterBottom>Step through the gate — enter your username or email and password to continue your adventure.</Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 2 }}>
                    {error && (
                        <Box sx={{ my: 2 }}>
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{
                                display: "inline-block",
                                animation: "shake 0.3s",
                                "@keyframes shake": {
                                    "0%": { transform: "translateX(0)" },
                                    "25%": { transform: "translateX(-4px)" },
                                    "50%": { transform: "translateX(4px)" },
                                    "75%": { transform: "translateX(-4px)" },
                                    "100%": { transform: "translateX(0)" },
                                },
                                }}
                            >
                                <strong>ERROR:</strong> {error}
                            </Typography>
                        </Box>
                    )}

                    <FormTextField
                        name="credential"
                        label="Username or Email"
                        registration={register("credential")}
                        fieldError={errors.credential}
                    />

                    <FormPasswordField
                        name="password"
                        label="Password"
                        registration={register("password")}
                        fieldError={errors.password}
                        passwordValue={password}
                        isTouched={isTouched}
                        displayRequirements={false}
                    />

                    <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting || loading}
                            sx={{ px: 8 }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
