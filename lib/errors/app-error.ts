export class AppError extends Error {
  status: number;
  userMessage: string;

  constructor(userMessage: string, status = 400, internalMessage?: string) {
    super(internalMessage || userMessage);
    this.status = status;
    this.userMessage = userMessage;
  }
}