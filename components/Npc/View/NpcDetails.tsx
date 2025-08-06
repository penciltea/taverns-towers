import { Box, Typography, List } from "@mui/material";
import { Npc } from "@/interfaces/npc.interface";
import InfoListItem from "@/components/Common/InfoListItem";
import { NPC_TRAITS } from "@/constants/npc.options";

export function getTraitLabel(value: string): string {
  for (const category of NPC_TRAITS) {
    const match = category.options.find(option => option.value === value);
    if (match) return match.label;
  }
  return value; // fallback to raw value if not found
}

export default function NpcDetails({ npc }: { npc: Npc }) {
  const fields = [
    { label: "Pronouns", value: npc.pronouns ? npc.pronouns : "N/A" },
    { label: "Age", value: npc.age ? npc.age : "N/A" },
    { label: "Race", value: npc.race ? npc.race : "N/A" },
    { label: "Alignment", value: npc.alignment ? npc.alignment : "N/A" },
    {
      label: "Trait(s)",
      value: npc.traits?.length
        ? npc.traits.map(getTraitLabel).join(", ")
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
        <Typography variant="h4" component="h2">Details</Typography>
        
        <List>
          {fields.map((field) => (
            <InfoListItem key={ field.label } label={ field.label } value={ field.value } />
          ))}
        </List>
      </Box>
    </>
  );
}