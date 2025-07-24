'use client'

import { FormTextField } from "@/components/Form";
import FormPasswordField from "@/components/Form/FormPasswordField";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { userSchema, UserSchema } from "@/schemas/user.schema";
import { Box, Button, FormHelperText, Paper, Typography } from "@mui/material";

export default function RegisterPage(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, touchedFields },
    } = useFormWithSchema(userSchema, {
        mode: "onChange"
    });

    const password = watch("password", "");
    const isTouched = !!touchedFields.password;

    const { submit, loading, error } = useAuthForm({ type: "register" });

    const onSubmit = (data: UserSchema) => submit(data);

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h3" component="h1" sx={{ marginBottom: 2 }}>Sign Up</Typography>
            <Typography variant="body1" component="h2">Ready your quill and map tools — your worldbuilding journey begins now. From hamlets to high halls, conjure what you need with a tap or craft your world yourself!</Typography>
            <Typography variant="body1" component="p">Getting started is free -- no gold required.</Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 2 }}>
                {error &&
                    <Box sx={{my: 2}}>
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{
                                display: "inline-block",
                                animation: "shake 0.3s",
                                '@keyframes shake': {
                                '0%': { transform: 'translateX(0)' },
                                '25%': { transform: 'translateX(-4px)' },
                                '50%': { transform: 'translateX(4px)' },
                                '75%': { transform: 'translateX(-4px)' },
                                '100%': { transform: 'translateX(0)' },
                                },
                            }}
                        >
                            <strong>ERROR:</strong> {error}
                        </Typography>
                    </Box>
                }

                <FormTextField
                    name="usernane"
                    label="Username"
                    registration={register("username")}
                    fieldError={errors.username}
                />

                <FormTextField
                    name="email"
                    label="Email"
                    registration={register("email")}
                    fieldError={errors.email}
                />

                <FormPasswordField
                    name="password"
                    label="Password"
                    registration={register("password")}
                    fieldError={errors.password}
                    passwordValue={password}
                    isTouched={isTouched}
                />

                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        
                        //disabled={isSubmitting}
                        sx={{ px: 8 }}
                    >
                        Sign Up
                    </Button>
                </Box>
                
            </Box>
        </Paper>
    )
}