import { Box, Typography, List } from "@mui/material";
import { Npc } from "@/interfaces/npc.interface";
import InfoListItem from "@/components/Common/InfoListItem";
import { toTitleCase } from "@/lib/util/stringFormats";
import { getOccupationLabel } from "@/lib/util/npcHelpers";


export default function NpcDetails({ npc }: { npc: Npc }) {
  const fields = [
    { label: "Pronouns", value: npc.pronouns ? npc.pronouns : "N/A" },
    { label: "Age", value: npc.age ? npc.age : "N/A" },
    { label: "Race", value: npc.race ? toTitleCase(npc.race) : "N/A" },
    { label: "Alignment", value: npc.alignment ? npc.alignment : "N/A" },
    { label: "Archetype", value: npc.archetype ? toTitleCase(npc.archetype) : "N/A" },
    { 
      label: "Occupation(s)", 
      value: npc.occupation?.length
        ? npc.occupation.map(getOccupationLabel).join(", ")
        : "N/A"
    },
    { label: "Status", value: npc.status }
  ];

  if (!npc) {
    return <Typography>Loading NPC details...</Typography>;
  }

  return (
    <>
      <Box sx={{marginTop: 1}}>
        <Typography variant="h4" component="h2">Basic Details</Typography>
        
        <List>
          {fields.map((field) => (
            <InfoListItem key={ field.label } label={ field.label } value={ field.value } />
          ))}
        </List>
      </Box>
    </>
  );
}