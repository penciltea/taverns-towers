'use client'

import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Spinner } from "@/components/Common/Spinner";
import { UserUpdateSchema } from "@/schemas/user.schema";
import FormTextField from "@/components/Form/FormTextField";
import FormPasswordField from "@/components/Form/FormPasswordField";
import FormImageUpload from "@/components/Form/FormImageUpload";
import { useUIStore } from "@/store/uiStore";

interface ProfileFormProps {
  onSubmit: (data: UserUpdateSchema) => void;
}

export default function ProfileForm({ onSubmit }: ProfileFormProps) {
    const methods = useFormContext<UserUpdateSchema>();
    const { handleSubmit, watch, register, formState: { errors } } = methods;
    const { isSubmitting } = useUIStore();

    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
        const messages = Object.values(errors)
            .map((error) => error?.message || "Invalid field")
            .filter(msg => !!msg);
        setFormError(messages.join(" • "));
        } else {
        setFormError(null);
        }
    }, [errors]);

    const handleCancel = () => {
        history.back();
    };

    return (
        <>
            {isSubmitting && <Spinner />}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" component="h1" gutterBottom>Update Profile</Typography>
                <Typography variant="subtitle1" component="p" gutterBottom>Edit your username, email address, password, or profile picture below.</Typography>

                {formError && (
                    <Box sx={{ mb: 2 }}>
                        <Typography color="error" sx={{ fontWeight: 'bold' }}>
                        Please fix the highlighted errors before submitting:
                        </Typography>
                        <ul style={{ color: '#d32f2f', marginTop: 4, marginBottom: 0, paddingLeft: 24 }}>
                        {formError.split(" • ").map((msg, idx) => (
                            <li key={idx}><Typography component="span" variant="body2">{msg}</Typography></li>
                        ))}
                        </ul>
                    </Box>
                )}

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <Box>
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
                            label="New Password"
                            registration={register("password")}
                            fieldError={errors.password}
                            passwordValue={watch("password") || ""}
                            isTouched={!!methods.formState.touchedFields.password}
                            required={false}
                            displayRequirements={true}
                            displayKeepCurrent={true}
                        />
                        
                    </Box>
                
                    <Box>
                        <FormImageUpload name="avatar" label="Profile Picture" />
                    </Box>

                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Button type="button" variant="outlined" onClick={handleCancel} size="large">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" size="large">
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </>
    );
}
