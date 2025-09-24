'use client'

import { Spinner } from "@/components/Common/Spinner";
import { FormTextField } from "@/components/Form";
import FormPasswordField from "@/components/Form/FormPasswordField";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { userSchema, UserSchema } from "@/schemas/user.schema";
import { Box, Button, Paper, Typography } from "@mui/material";

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

    const { submit, error } = useAuthForm({ type: "register" });

    const onSubmit = (data: UserSchema) => submit(data);

    return (
        <>
            {isSubmitting && <Spinner />}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Paper 
                    elevation={3} 
                    sx={{
                        width: {
                            xs: '90%',
                            sm: 400,
                            md: 500,
                            lg: 600,
                        },
                        maxWidth: '100%',
                        p: 3,
                    }}
                >
                    <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>Sign Up</Typography>
                    <Typography variant="body1" component="h2" gutterBottom>Ready your quill and map tools — your worldbuilding journey begins now. From hamlets to high halls, conjure what you need with a tap or craft your world yourself!</Typography>
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
                            label="Username"
                            registration={register("username")}
                            fieldError={errors.username}
                        />

                        <FormTextField
                            label="Email"
                            registration={register("email")}
                            fieldError={errors.email}
                        />

                        <FormPasswordField
                            label="Password"
                            registration={register("password")}
                            fieldError={errors.password}
                            passwordValue={password}
                            isTouched={isTouched}
                            displayRequirements={true}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{ px: 8 }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                        
                    </Box>
                </Paper>
            </Box>
        </>
    )
}