import { ActionResult } from "@/interfaces/server-action.interface";
import { AppError } from "@/lib/errors/app-error";

export async function safeServerAction<T>(fn: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (err: unknown) {
    if (err instanceof AppError) {
      return { success: false, message: err.userMessage, status: err.status };
    }
    console.error(err); // log internal errors
    return { success: false, message: "Something went wrong. Please try again later.", status: 500 };
  }
}