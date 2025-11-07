import { UserPermissions } from "@/interfaces/user.interface";

interface ItemPermissions {
  userId: string;
  editors?: string[]; // user ids who have been given edit permissions
}

interface PlayerPermission {
  _id: string;
  user: string | { id: string; username?: string; email?: string };
  roles: string[];  // e.g. ["player", "editor"]
}

export function canCreate(
  campaignPermissions?: {
    canCreateContent: boolean;
    isOwner?: boolean;
  }
): boolean {
  if(campaignPermissions){
    if (campaignPermissions.isOwner) return true; // campaign owner
    if (campaignPermissions.canCreateContent) return true; // all non-player roles
  }

  return false
}

export function canEdit(
  user: UserPermissions | null,
  item: ItemPermissions,
  campaignPermissions?: {
    canEditOwnContent: boolean;
    canEditAllContent: boolean;
    isOwner?: boolean;
  }
): boolean {
  if (!user) return false;

  // For content inside of a campaign
  if (campaignPermissions) {
    if (campaignPermissions.isOwner) return true; // campaign owner
    if (campaignPermissions.canEditAllContent) return true; // can edit anyone’s content
    if (campaignPermissions.canEditOwnContent && user.id === item.userId) return true; // can edit own content
  } else {
    // For content outside of a campaign
    if (user.id === item.userId) return true; // user owns the content
    if (item.editors?.includes(user.id)) return true; // explicit editors for standalone content
  }

  return false;
}

export function canDelete(
  user: UserPermissions | null,
  item: ItemPermissions,
  campaignPermissions?: { isOwner?: boolean }
): boolean {
  if (!user) return false;

  // For campaign content
  if (campaignPermissions) {
    return campaignPermissions.isOwner === true; // only campaign owner can delete
  } else {
    // For content outside of a campaign
    return user.id === item.userId; // user can delete their own content
  }
}