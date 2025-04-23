"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import * as z from "zod";

interface FilterDialogProps<T extends z.ZodTypeAny> {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<T>) => void;
  schema: T;
  defaultValues: Partial<z.infer<T>>;
  children: ReactNode;
  title?: string;
}

export default function FilterDialog<T extends z.ZodTypeAny>({
  open,
  onClose,
  onSubmit,
  schema,
  defaultValues,
  children,
  title = "Advanced Filters",
}: FilterDialogProps<T>) {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Apply</Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
