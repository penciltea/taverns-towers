"use client";

import { useState, useId } from "react";
import { FieldError, Merge, FieldErrorsImpl, UseFormRegisterReturn, FieldValues } from "react-hook-form";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Box, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


interface FormPasswordFieldProps<TFieldValues extends FieldValues> {
    label: string;
    registration: UseFormRegisterReturn;
    fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<TFieldValues>> | undefined;
    required?: boolean;
    passwordValue: string;
    isTouched: boolean;
    displayRequirements: boolean;
    displayKeepCurrent: boolean;
}

const FormPasswordField = <TFieldValues extends FieldValues>({
    label,
    registration,
    fieldError,
    required = false,
    passwordValue,
    isTouched,
    displayRequirements = false,
    displayKeepCurrent = false
}: FormPasswordFieldProps<TFieldValues>) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const id = useId();

    // For checking if the password matches validation requirements
    const checklistId = `${id}-requirements`;
    const isMinLength = passwordValue?.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
    const isValidPassword = isMinLength && hasSpecialChar;

    const srOnly = {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
    };

    const Requirement = ({
        passed,
        text,
    }: {
        passed: boolean;
        text: string;
    }) => (
        <Typography
            component="li"
            sx={{
            color: passed ? "success.main" : isTouched ? "error.main" : "text.secondary",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 1,
            }}
        >
            <Box component="span" aria-hidden="true">
                {passed ? "✓" : "✗"}
            </Box>
            <Box component="span" sx={srOnly}>
                {passed ? "Requirement met:" : "Missing requirement:"}
            </Box>
            {text}
        </Typography>
    );

    return (
        <>
            <FormControl fullWidth variant="outlined" margin="normal" required={required} error={!!fieldError}>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <OutlinedInput
                    id={id}
                    type={showPassword ? "text" : "password"}
                    label={label}
                    aria-invalid={!isValidPassword && isTouched}
                    aria-describedby={checklistId}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    {...registration}
                />
            </FormControl>

            {displayKeepCurrent &&
                <Typography variant="caption" gutterBottom>Leave blank to keep your current password.</Typography>
            }
            
            {/* Password Requirements */}
            {displayRequirements &&
                <>
                    <Typography variant="body2">Password Requirements</Typography>
                    <Box component="ul" id={checklistId} aria-live="polite" sx={{ pl: 2, mt: 1, mb: 2 }}>
                        <Requirement passed={isMinLength} text="At least 8 characters" />
                        <Requirement passed={hasSpecialChar} text="At least one special character" />
                    </Box>
                </>
            }
        </>
    );
};

export default FormPasswordField;
