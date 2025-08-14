'use client'

import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { DefaultNpcQueryParams } from "@/interfaces/npc.interface";
import EntityLinkDialog from "@/components/Common/EntityLink/EntityLinkDialog";
import { Npc } from "@/interfaces/npc.interface";
import { Spinner } from "@/components/Common/Spinner";
import { Typography } from "@mui/material";

interface AssignNpcDialogProps {
  open: boolean;
  onClose: () => void;
  /** NPCs currently assigned in parent form */
  selected: Npc[];
  /** Called when user confirms selection */
  onConfirm: (npcs: Npc[]) => void;
}

export default function AssignNpcDialog({
  open,
  onClose,
  selected,
  onConfirm
}: AssignNpcDialogProps) {
  const { data, isLoading, error } = useOwnedNpcsQuery(DefaultNpcQueryParams);

  if (isLoading) return <Spinner />;
  if (error || !data?.success) return <Typography>Failed to load NPCs.</Typography>;

  return (
    <EntityLinkDialog<Npc>
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      selected={selected}
      entities={data.npcs}
      getId={(npc) => npc._id}
      getLabel={(npc) => npc.name || "Unnamed NPC"}
      entityLabel="NPC"
      allowMultiple
    />
  );
}
