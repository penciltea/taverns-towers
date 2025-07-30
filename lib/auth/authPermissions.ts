import { UserPermissions } from "@/interfaces/user.interface";

interface ItemPermissions {
  userId: string;
  editors?: string[]; // user ids who have been given edit permissions
}

export function canEdit( user: UserPermissions | null, item: ItemPermissions ): boolean {
  if (!user) return false; // not logged in

  // Current simple logic: must be owner
  if (user.id === item.userId) return true;

  // Future extension: user granted edit permission explicitly
  if (item.editors?.includes(user.id)) return true;

  return false;
}


export function canDelete( user: UserPermissions | null, item: ItemPermissions ): boolean {
    if (!user) return false; // not logged in

    // Current simple logic: must be owner
    if (user.id === item.userId) return true;

    return false;
}