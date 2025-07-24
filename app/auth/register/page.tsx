'use client'

import { FormTextField } from "@/components/Form";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { userSchema, UserSchema } from "@/schemas/user.schema";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function RegisterPage(){
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useFormWithSchema(userSchema);

    const { submit, loading, error } = useAuthForm({ type: "register" });

    const onSubmit = (data: UserSchema) => submit(data);

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h3" component="h1">Sign Up</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>

                {error &&
                    <Typography variant="body2" sx={{color: 'red'}}>{ error }</Typography>
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

                <FormTextField
                    name="password"
                    label="Password"
                    registration={register("password")}
                    fieldError={errors.password}
                />

                <Button
                    type="submit"
                    variant="contained"
                    
                    //disabled={isSubmitting}
                    sx={{ mt: 2 }}
                >
                    Sign Up
                </Button>
            </Box>
        </Paper>
    )
}