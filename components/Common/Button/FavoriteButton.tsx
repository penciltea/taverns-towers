'use client';

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ToggleFieldButton from "@/components/Common/Button/ToggleFieldButton";

interface FavoriteButtonProps<T extends { _id: string; favorite?: boolean }> {
  item: T;
  onToggleFavorite: (updated: Pick<T, "_id" | "favorite">) => Promise<void>;
  /** Optional MUI IconButton props */
  iconProps?: React.ComponentProps<typeof ToggleFieldButton<T, "favorite">>["iconProps"];
}

export default function FavoriteButton<T extends { _id: string; favorite?: boolean }>({
  item,
  onToggleFavorite,
  iconProps,
}: FavoriteButtonProps<T>) {
  return (
    <ToggleFieldButton<T, "favorite">
      item={item}
      field="favorite"
      onToggle={onToggleFavorite}
      TrueIcon={Favorite}
      FalseIcon={FavoriteBorder}
      iconProps={{
        sx: { marginRight: 1 },
        color: "secondary",
        ...iconProps, // allow overrides
      }}
    />
  );
}
