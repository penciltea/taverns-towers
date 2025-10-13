'use client';

import { useAuthForm } from "@/hooks/useAuthForm";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { userSchema, UserSchema } from "@/schemas/user.schema";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Spinner } from "@/components/Common/Spinner";
import { FormTextField } from "@/components/Form";
import FormPasswordField from "@/components/Form/FormPasswordField";
import { AuthFormProps } from "@/interfaces/ui.interface";


export default function RegisterForm({ onSuccess, skipRedirect}: AuthFormProps) {
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

    const { submit, error } = useAuthForm({ type: "register", onSuccess, skipRedirect });

    const onSubmit = (data: UserSchema) => submit(data);

    return (
        <>
        {isSubmitting && <Spinner />}
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
                    displayKeepCurrent={false}
                />

                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{ px: 8 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </>
    )
}