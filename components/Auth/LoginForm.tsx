'use client';

import { FormTextField } from "@/components/Form";
import FormPasswordField from "@/components/Form/FormPasswordField";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { loginSchema, LoginSchema } from "@/schemas/user.schema";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAuthForm } from "@/hooks/useAuthForm";
import { Spinner } from "@/components/Common/Spinner";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { AuthFormProps } from "@/interfaces/ui.interface";

export default function LoginForm({ onSuccess }: AuthFormProps) {
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

  const { submit, loading, error } = useAuthForm({ type: "login", onSuccess });

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
          displayKeepCurrent={false}
        />

        <Box sx={{ display: "flex", justifyContent: "end", my: 2, flexDirection: "column", alignItems: "center" }}>
          <Button
            size="large"
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting || loading}
            sx={{ px: 8 }}
          >
            Log In
          </Button>
          <Typography variant="body1" sx={{py: 2}} >Forgot your password? <NextMuiLink href="/forgot-password" underline="always">Reset it here!</NextMuiLink>.</Typography>
        </Box>
      </Box>
    </>
  );
}