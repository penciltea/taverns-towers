export const SPECIAL_CHARACTERS = `!@#$%^&*(),.?":{}|<>`;

export interface PasswordValidationResult {
  isMinLength: boolean;
  hasSpecialChar: boolean;
  isValid: boolean;
}

export function validatePassword(password: string): PasswordValidationResult {
  const isMinLength = password.length >= 8;
  const hasSpecialChar = new RegExp(`[${SPECIAL_CHARACTERS.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')}]`).test(password);
  const isValid = isMinLength && hasSpecialChar;

  return { isMinLength, hasSpecialChar, isValid };
}