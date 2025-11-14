'use client';

import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteButton from "@/components/Common/Button/FavoriteButton";
import DeleteConfirmationDialog from "@/components/Common/Dialog/DeleteConfirmationDialog";

type CommonItem = { _id: string; favorite?: boolean; campaignHighlight?: boolean };

interface EntityViewActionsProps<T extends CommonItem> {
  item: T;

  // Permissions
  canFavorite: boolean;
  canEdit?: boolean;
  canHighlight?: boolean;
  canMove?: boolean;
  canCopy?: boolean;
  canDelete?: boolean;

  // Callbacks
  onToggleFavorite: (updated: Pick<T, "_id" | "favorite">) => Promise<void>;
  onEdit?: () => void;
  onHighlight?: () => Promise<void>;
  onMove?: () => void;
  onCopy?: () => void;
  onDelete?: () => Promise<void>; // simplified: the caller handles post-delete actions
}

export default function EntityViewActions<T extends CommonItem>({
  item,
  canFavorite,
  canEdit,
  canHighlight,
  canMove,
  canCopy,
  canDelete,
  onToggleFavorite,
  onEdit,
  onHighlight,
  onMove,
  onCopy,
  onDelete,
}: EntityViewActionsProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const open = Boolean(anchorEl);

  // Determine if any menu actions exist
    const hasMenuActions =
    (canHighlight && !!onHighlight) ||
    (canMove && !!onMove) ||
    (canCopy && !!onCopy) ||
    (canDelete && !!onDelete);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleDelete = async () => {
    try {
      if (!onDelete) return;
      await onDelete();
      setConfirmOpen(false);
      handleCloseMenu();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Favorite button */}
            {canFavorite && (
                <FavoriteButton<T>
                    item={item}
                    onToggleFavorite={onToggleFavorite}
                    iconProps={{ sx: { mr: 1 } }}
                />
            )}

            {/* Edit button, if needed */}
            {canEdit && onEdit && (
                <Button 
                    size="medium" 
                    sx={{ color: "#1d2a3b" }} 
                    variant="contained" color="primary" 
                    startIcon={<EditIcon />}  
                    onClick={onEdit}
                >
                    Edit
                </Button>
            )}

            {/* More actions menu */}
            {hasMenuActions && (
                <>
                    <Tooltip title="More actions">
                        <IconButton onClick={handleOpenMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>

                    <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                        {/* Campaign Highlight */}
                        {canHighlight && onHighlight && (
                        <MenuItem
                            onClick={async () => {
                            await onHighlight();
                            handleCloseMenu();
                            }}
                        >
                            <ListItemIcon>
                                {item.campaignHighlight ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
                            </ListItemIcon>
                            <ListItemText>Highlight in Campaign</ListItemText>
                        </MenuItem>
                        )}

                        {/* Move */}
                        {canMove && onMove && (
                        <MenuItem
                            onClick={() => {
                            onMove();
                            handleCloseMenu();
                            }}
                        >
                            <ListItemIcon>
                                <DriveFileMoveIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Move to…</ListItemText>
                        </MenuItem>
                        )}

                        {/* Copy */}
                        {canCopy && onCopy && (
                        <MenuItem
                            onClick={() => {
                            onCopy();
                            handleCloseMenu();
                            }}
                        >
                            <ListItemIcon>
                                <ContentCopyIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Copy</ListItemText>
                        </MenuItem>
                        )}

                        {/* Delete */}
                        {canDelete && onDelete && (
                            <MenuItem
                                onClick={() => setConfirmOpen(true)}
                                sx={{ color: "error.main" }}
                            >
                                <ListItemIcon>
                                    <DeleteIcon fontSize="small" color="error" />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                        )}
                    </Menu>
                </>
            )}
        </Box>
        <DeleteConfirmationDialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleDelete}
            deleting="item"
        />
    </>
  );
}