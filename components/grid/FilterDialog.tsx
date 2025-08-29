"use client";

import { useId } from "react";
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

  const titleId = useId(); // for accessibility/screen readers

  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" aria-labelledby={titleId}>
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button variant="text" size="small" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Apply</Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
