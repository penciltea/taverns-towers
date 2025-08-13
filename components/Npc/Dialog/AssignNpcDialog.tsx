import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { DefaultNpcQueryParams } from "@/interfaces/npc.interface";
import NpcForm from "../Form/NpcForm";
import EntityLinkDialog from "@/components/Common/EntityLink/EntityLinkDialog";
import { Npc } from "@/interfaces/npc.interface";
import { Spinner } from "@/components/Common/Spinner";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { Typography } from "@mui/material";
import NewNpcPage from "@/app/npcs/new/page";
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
}: AssignNpcDialogProps & { generator?: typeof NewNpcPage.prototype.generator }) {
  const { data, isLoading, error } = useOwnedNpcsQuery(DefaultNpcQueryParams);
  const { handleSubmit: createNpcMutation } = useNpcMutations({ mode: "add" });
  const methods = useNpcForm(); // React Hook Form methods
  const npcGenerator = useNpcGeneratorActions(methods);

  return isLoading ? (
    <Spinner />
  ) : error || !data?.success ? (
    <Typography>Failed to load NPCs.</Typography>
  ) : (
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
      createEntityForm={
        <NpcForm
          mode="add"
          onSubmit={async (npcData) => {
            // Call your existing mutation from useNpcMutations
            const newNpc = await createNpcMutation(npcData);
            return newNpc; // must return the newly-created NPC for EntityLinkDialog
          }}
          generator={npcGenerator}
        />
      }
    />
  );
}
