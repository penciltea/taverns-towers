import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SettlementAccordionProps } from "@/interfaces/settlement.interface";

export default function SettlementAccordion({
  title,
  children,
  defaultExpanded = false
}: SettlementAccordionProps) {
  // Generate a unique ID for each instance (could be based on title or a uuid if needed)
  const summaryId = `accordion-summary-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const detailsId = `accordion-details-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={summaryId}
        aria-controls={detailsId}
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails id={detailsId} aria-labelledby={summaryId}>
        <Box mb={2}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
}
