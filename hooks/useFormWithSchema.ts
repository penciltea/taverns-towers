// hooks/useZodForm.ts
import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, TypeOf } from "zod";

export function useFormWithSchema<T extends ZodType<any, any>>(
  schema: T,
  options?: Omit<UseFormProps<TypeOf<T>>, "resolver">
) {
  return useForm<TypeOf<T>>({
    ...options,
    resolver: zodResolver(schema),
  });
}
