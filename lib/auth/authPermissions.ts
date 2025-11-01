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

interface CampaignPermissions extends ItemPermissions {
  players?: PlayerPermission[];
}

export function canEdit(
  user: UserPermissions | null,
  item: ItemPermissions | CampaignPermissions
): boolean {
  if (!user) return false;

  // Owner always can edit
  if (user.id === item.userId) return true;

  // Explicit editors
  if (item.editors?.includes(user.id)) return true;

  // Campaign players with "editor" role
  if ("players" in item && Array.isArray(item.players)) {

    const isEditorPlayer = item.players.some((player) => {
      const playerUserId =
        typeof player.user === "string" ? player.user : player.user.id;
      return (
        playerUserId.toString() === user.id.toString() &&
        player.roles.includes("editor")
      );
    });

    if (isEditorPlayer) return true;
  }

  // Otherwise, no editing rights
  return false;
}


export function canDelete( user: UserPermissions | null, item: ItemPermissions ): boolean {
    if (!user) return false; // not logged in

    // Current simple logic: must be owner
    if (user.id === item.userId) return true;

    return false;
}