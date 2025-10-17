'use client';

import IconButton from "@mui/material/IconButton";
import { SvgIconComponent } from "@mui/icons-material";
import { useState } from "react";

interface ToggleButtonProps<T extends { _id: string }, K extends keyof T> {
  item: T;
  field: K;
  onToggle: (updatedItem: Pick<T, "_id" | K>) => Promise<void>;
  TrueIcon: SvgIconComponent;
  FalseIcon: SvgIconComponent;
  iconProps?: React.ComponentProps<typeof IconButton>;
}

export default function ToggleFieldButton<
  T extends { _id: string },
  K extends keyof T
>({ item, field, onToggle, TrueIcon, FalseIcon, iconProps }: ToggleButtonProps<T, K>) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const updated: Pick<T, "_id" | K> = { _id: item._id, [field]: !(item[field] as boolean) } as Pick<T, "_id" | K>;
      await onToggle(updated);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleClick} {...iconProps}>
      {item[field] ? <TrueIcon /> : <FalseIcon />}
    </IconButton>
  );
}
