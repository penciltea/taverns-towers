"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
