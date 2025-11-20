interface ItemPermissions {
  userId: string;
  editors?: string[]; // user ids who have been given edit permissions
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
  userId: string | undefined,
  item: ItemPermissions,
  campaignPermissions?: {
    canEditOwnContent: boolean;
    canEditAllContent: boolean;
    isOwner?: boolean;
  }
): boolean {
  if (!userId) return false;

  // For content inside of a campaign
  if (campaignPermissions) {
    if (campaignPermissions.isOwner) return true; // campaign owner
    if (campaignPermissions.canEditAllContent) return true; // can edit anyone’s content
    if (campaignPermissions.canEditOwnContent && userId === item.userId) return true; // can edit own content
  } else {
    // For content outside of a campaign
    if (userId === item.userId) return true; // user owns the content
    if (item.editors?.includes(userId)) return true; // explicit editors for standalone content
  }

  return false;
}


export function canDelete(
  userId: string | undefined,
  item: ItemPermissions,
  campaignPermissions?: { isOwner?: boolean }
): boolean {
  if (!userId) return false;

  // For campaign content
  if (campaignPermissions) {
    return campaignPermissions.isOwner === true; // only campaign owner can delete
  } else {
    // For content outside of a campaign
    return userId === item.userId; // user can delete their own content
  }
}