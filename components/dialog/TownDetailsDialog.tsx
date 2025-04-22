import { Dialog, DialogTitle, DialogContent, Divider, Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { TownDialogProps } from "@/interfaces/town.interface";
import TownAccordion from "../town/View/townAccordion";

export default function TownDetailsDialog({ open, onClose, town }: TownDialogProps) {
    return(
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle>Additional Details - {town.name}</DialogTitle>
            <DialogContent dividers>
                {/* Leadership & Wealth */}
                <TownAccordion title="Leadership & Wealth" defaultExpanded>
                    <Typography><strong>Leader(s):</strong> {town.leader || "N/A"}</Typography>
                    <Typography><strong>Ruling Style:</strong> {town.rulingStyle || "N/A"}</Typography>
                    <Typography><strong>Guilds:</strong> {town.guilds || "N/A"}</Typography>
                    <Typography><strong>Trade Notes:</strong> {town.tradeNotes || "N/A"}</Typography>
                    <Typography><strong>Wealth:</strong> {town.wealth || "N/A"}</Typography>
                </TownAccordion>

                
                {/* Culture & Society */}
                <TownAccordion title="Culture & Society" defaultExpanded>
                    <Typography><strong>Religion:</strong> {town.religion || "N/A"}</Typography>
                    <Typography><strong>Holidays:</strong> {town.holidays || "N/A"}</Typography>
                    <Typography><strong>Folklore:</strong> {town.folklore || "N/A"}</Typography>
                    <Typography><strong>Criminal Activity:</strong> {town.crime?.length ? town.crime.join(", ") : "N/A"}</Typography>
                </TownAccordion>

                {/* Notes */}
                <TownAccordion title="Notes" defaultExpanded>
                    <Typography><strong>Public Notes:</strong> {town.publicNotes || "N/A"}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography><strong>GM Notes:</strong> {town.gmNotes || "N/A"}</Typography>
                </TownAccordion>
            </DialogContent>

            <Box display="flex" justifyContent="flex-end" p={2}>
                <Button variant="outlined" onClick={onClose}>Close</Button>
            </Box>
        </Dialog>
    )
}