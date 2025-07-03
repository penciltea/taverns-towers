import { Stack, Button } from "@mui/material";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { FormTextField } from "@/components/Form";

type FormFieldWithGenerateProps = {
  name: string;
  label: string;
  required?: boolean;
  onGenerate?: (target?: string) => Promise<void> | void;
  registration: ReturnType<any>; // typically `register('name')`
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  buttonLabel?: string;
};

export default function FormFieldWithGenerate({
  name,
  label,
  required = false,
  onGenerate,
  registration,
  fieldError,
  buttonLabel = "Generate",
}: FormFieldWithGenerateProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mt: 1.5 }}>
      <FormTextField
        name={name}
        label={label}
        registration={registration}
        fieldError={fieldError}
        required={required}
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