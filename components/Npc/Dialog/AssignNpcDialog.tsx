import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { DefaultNpcQueryParams } from "@/interfaces/npc.interface";
import NpcForm from "../Form/NpcForm";
import EntityLinkDialog from "@/components/Common/EntityLink/EntityLinkDialog";
import { Npc } from "@/interfaces/npc.interface";
import { Spinner } from "@/components/Common/Spinner";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { Typography } from "@mui/material";
import { useNpcGeneratorActions } from "@/hooks/npc/useNpcGeneratorActions";
import { useNpcForm } from "@/hooks/npc/useNpcForm";

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
  const { handleSubmit: createNpcMutation } = useNpcMutations({ mode: "add" });
  const methods = useNpcForm(); 
  const npcGenerator = useNpcGeneratorActions(methods);

  if (isLoading) return <Spinner />;
  if (error || !data?.success) return <Typography>Failed to load NPCs.</Typography>;

  return (
    <EntityLinkDialog<Npc>
      open={open}
      onClose={onClose}
      onConfirm={onConfirm} // <-- passes full NPC[] back to form
      selected={selected}
      entities={data.npcs}
      getId={(npc) => npc._id}
      getLabel={(npc) => npc.name || "Unnamed NPC"}
      entityLabel="NPC"
      allowMultiple
      createEntityForm={
        <NpcForm
          mode="add"
          onSubmit={async (npcData) => {
            const newNpc = await createNpcMutation(npcData);
            return newNpc;
          }}
          generator={npcGenerator}
        />
      }
    />
  );
}
