"use client";

import { useId, ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm, FormProvider, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface FilterDialogProps<T extends z.ZodTypeAny> {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<T>) => void;
  schema: T;
  defaultValues: Partial<z.infer<T>>;
  children: (control: Control<z.infer<T>>) => ReactNode; 
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
  const initialValues = { ...schema.parse({}), ...defaultValues };

  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogContent dividers>{children(methods.control)}</DialogContent>
          <DialogActions>
            <Button variant="text" size="small" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Apply</Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
