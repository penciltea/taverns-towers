import { Box, Typography, List, Button } from "@mui/material";
import { Settlement } from "@/interfaces/settlement.interface";
import { useUIStore } from "@/store/uiStore";
import InfoListItem from "@/components/Common/InfoListItem";
import { useOwnedNpcsQuery } from "@/hooks/npc/npc.query";
import { Npc } from "@/interfaces/npc.interface";

export default function SettlementDetails({ settlement }: { settlement: Settlement }) {
  const { setOpenDialog, openDialog, closeDialog } = useUIStore();

  // Fetch all NPCs that could be leaders (or your full owned NPC list)
  const { data: npcData } = useOwnedNpcsQuery({ page: 1, limit: 999 });
  const npcMap = new Map<string, Npc>(npcData?.npcs.map((npc) => [npc._id, npc]) || []);

  const leaderNames = settlement.leader?.map((id) => npcMap.get(id)?.name || "Unnamed NPC").join(", ") || "N/A";


  const fields = [
    { label: "Size", value: settlement.size },
    { label: "Tags", value: settlement.tags?.length ? settlement.tags.join(", ") : "N/A" },
    { label: "Terrain", value: settlement.terrain?.length ? settlement.terrain.join(", ") : "N/A" },
    { label: "Climate", value: settlement.climate },
    { label: "Magic Use/Level", value: settlement.magic },
    { label: "Wealth", value: settlement.wealth },
    { label: "Leader(s)", value: leaderNames },
  ];

  if (!settlement) {
    return <Typography>Loading settlement details...</Typography>;
  }

  return (
    <>
      <Box sx={{marginTop: 1}}>
        <Typography variant="h4" component="h2">Details</Typography>
        
        <List>
          {fields.map((field) => (
            <InfoListItem key={ field.label } label={ field.label } value={ field.value } />
          ))}
        </List>
        <Button variant="outlined" onClick={() => setOpenDialog('SettlementDetailsDialog', { settlement: settlement })}>Additional Details</Button>
      </Box>
    </>
  );
}