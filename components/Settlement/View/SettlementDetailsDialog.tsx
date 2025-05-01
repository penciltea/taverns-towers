import { Dialog, DialogTitle, DialogContent, Divider, Box, Button, Typography } from '@mui/material';
import { SettlementDialogProps } from "@/interfaces/settlement.interface";
import SettlementAccordion from "./SettlementAccordion";

export default function SettlementDetailsDialog({ open, onClose, settlement }: SettlementDialogProps) {
    return(
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle>Additional Details - {settlement.name}</DialogTitle>
            <DialogContent dividers>
                {/* Leadership & Wealth */}
                <SettlementAccordion title="Leadership & Wealth" defaultExpanded>
                    <Typography><strong>Leader(s):</strong> {settlement.leader || "N/A"}</Typography>
                    <Typography><strong>Ruling Style:</strong> {settlement.rulingStyle || "N/A"}</Typography>
                    <Typography><strong>Guilds:</strong> {settlement.guilds || "N/A"}</Typography>
                    <Typography><strong>Trade Notes:</strong> {settlement.tradeNotes || "N/A"}</Typography>
                    <Typography><strong>Wealth:</strong> {settlement.wealth || "N/A"}</Typography>
                </SettlementAccordion>

                
                {/* Culture & Society */}
                <SettlementAccordion title="Culture & Society" defaultExpanded>
                    <Typography><strong>Religion:</strong> {settlement.religion || "N/A"}</Typography>
                    <Typography><strong>Holidays:</strong> {settlement.holidays || "N/A"}</Typography>
                    <Typography><strong>Folklore:</strong> {settlement.folklore || "N/A"}</Typography>
                    <Typography><strong>Criminal Activity:</strong> {settlement.crime?.length ? settlement.crime.join(", ") : "N/A"}</Typography>
                </SettlementAccordion>

                {/* Notes */}
                <SettlementAccordion title="Notes" defaultExpanded>
                    <Typography><strong>Public Notes:</strong> {settlement.publicNotes || "N/A"}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography><strong>GM Notes:</strong> {settlement.gmNotes || "N/A"}</Typography>
                </SettlementAccordion>
            </DialogContent>

            <Box display="flex" justifyContent="flex-end" p={2}>
                <Button variant="outlined" onClick={onClose}>Close</Button>
            </Box>
        </Dialog>
    )
}