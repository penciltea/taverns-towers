
import { JSX } from "react";
import { Stack, Button } from "@mui/material";
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegisterReturn } from "react-hook-form";
import { FormTextField } from "@/components/Form";

type FormFieldWithGenerateProps<TFieldValues extends FieldValues> = {
  name: string;
  label: string;
  required?: boolean;
  onGenerate?: (target?: string) => Promise<void> | void;
  registration: UseFormRegisterReturn; 
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<TFieldValues>>;
  buttonLabel?: string;
  tooltip?: string | JSX.Element;
};

export default function FormFieldWithGenerate<
  TFieldValues extends FieldValues
>({
  name,
  label,
  required = false,
  onGenerate,
  registration,
  fieldError,
  buttonLabel = "Generate",
  tooltip
}: FormFieldWithGenerateProps<TFieldValues>) {
  return (
    <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mt: 1.5 }}>
      <FormTextField
        label={label}
        registration={registration}
        fieldError={fieldError}
        required={required}
        tooltip={tooltip}
      />
      {onGenerate && (
        <Button
          variant="outlined"
          onClick={() => onGenerate(name)}
          size="large"
          sx={{ py: 1.65 }}
        >
          {buttonLabel}
        </Button>
      )}
    </Stack>
  );
}