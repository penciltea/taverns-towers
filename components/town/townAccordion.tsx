import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

interface TownAccordionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

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
