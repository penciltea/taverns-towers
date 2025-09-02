'use client';

import { FormTextField } from "@/components/Form";
import FormPasswordField from "@/components/Form/FormPasswordField";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { loginSchema, LoginSchema } from "@/schemas/user.schema";
import { Box, Button, Typography } from "@mui/material";
import { useAuthForm } from "@/hooks/useAuthForm";
import { Spinner } from "../Common/Spinner";

type LoginFormProps = {
  onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
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

  const { submit, loading, error } = useAuthForm({
    type: "login",
    onSuccess,
  });

  const onSubmit = (data: LoginSchema) => submit(data);

  return (
    <>
      {(isSubmitting || loading) && <Spinner />}
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
              <strong>ERROR:</strong> { error }
            </Typography>
          </Box>
        )}

        <FormTextField
          label="Username or Email"
          registration={register("credential")}
          fieldError={errors.credential}
        />

        <FormPasswordField
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
    </>
  );
}