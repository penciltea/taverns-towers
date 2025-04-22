import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TownAccordionProps } from "@/interfaces/town.interface";

export default function TownAccordion({ title, children, defaultExpanded = false }: TownAccordionProps) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <Box mb={2}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
}
