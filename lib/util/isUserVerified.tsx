import { UserInterface } from "@/interfaces/user.interface";

export function isUserVerified(user?: UserInterface | null): boolean {
  if (!user) return false;

  // Patreon-authenticated users are considered verified
  if (user.patreon) return true;

  // Native RealmFoundry users must have emailVerified = true
  return user.emailVerified === true;
}