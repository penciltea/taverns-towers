import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { useId } from "react";
import Image from "next/image";

type FormImageUploadProps = {
  name: string;
  label: string;
};

export default function FormImageUpload({ name, label }: FormImageUploadProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const id = useId();
  const inputId = `${id}-${name}`;
  const fieldValue = watch(name);
  const isBrowser = typeof window !== "undefined";

  const previewUrl =
    typeof fieldValue === "string"
      ? fieldValue
      : isBrowser && fieldValue instanceof FileList && fieldValue[0]
      ? URL.createObjectURL(fieldValue[0])
      : null;

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" component="label" htmlFor={inputId} sx={{marginRight: 1}}>
        {label}
      </Typography>
      <input
        type="file"
        id={inputId}
        accept="image/*"
        aria-describedby={errors[name] ? `${inputId}-error` : undefined}
        {...register(name)}
      />
      {typeof errors[name]?.message === "string" && (
        <Typography color="error" id={`${inputId}-error`}>
          {errors[name]?.message}
        </Typography>
      )}

      {previewUrl && (
        <Box 
          mt={2}
          maxWidth={400}
        >
          <Typography variant="subtitle2">Preview:</Typography>
          <Box sx={{ position: "relative", width: "100%", borderRadius: 2, overflow: "hidden" }}>
            <Image
              src={previewUrl}
              alt={`${label} preview`}
              priority
              width={800}   // pick a large enough default
              height={600}  // maintains aspect ratio
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
