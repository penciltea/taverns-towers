import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SettlementAccordionProps } from "@/interfaces/settlement.interface";

export default function SettlementAccordion({ title, children, defaultExpanded = false }: SettlementAccordionProps) {
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
