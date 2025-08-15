"use client";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionWrapperProps {
  label: string;
  children: React.ReactNode;
}

export function AccordionWrapper({ label, children }: AccordionWrapperProps) {
  return (
    <Accordion sx={{marginBottom: 3}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
}
