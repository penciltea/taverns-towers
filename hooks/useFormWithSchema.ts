import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, TypeOf } from "zod";

// A small hook for some Zod and RHF boilerplate

export function useFormWithSchema<T extends ZodType<any, any>>(
  schema: T,
  options?: Omit<UseFormProps<TypeOf<T>>, "resolver">
) {
  return useForm<TypeOf<T>>({
    ...options,
    resolver: zodResolver(schema),
  });
}
