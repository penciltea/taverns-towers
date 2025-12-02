'use client'

import { useSession } from 'next-auth/react';
import { Dialog, DialogTitle, DialogContent, Divider, Box, Button, Typography, Chip, Stack } from '@mui/material';
import { SettlementDialogProps } from "@/interfaces/settlement.interface";
import SettlementAccordion from "./SettlementAccordion";
import { useCampaignPermissionsQuery } from '@/hooks/campaign/campaign.query';
import { useCampaignStore } from '@/store/campaignStore';


export default function SettlementDetailsDialog({ open, onClose, settlement }: SettlementDialogProps) {
    const { data: session } = useSession();
    const user = session?.user ? { id: session.user.id } : null;
    const { selectedCampaign } = useCampaignStore();
    const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

    return(
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper" aria-labelledby="settlement-dialog-title">
            <DialogTitle id="settlement-dialog-title">Additional Details - {settlement.name}</DialogTitle>
            <DialogContent dividers>
                {/* Leadership & Wealth */}
                <SettlementAccordion title="Leadership & Wealth" defaultExpanded>
                    <Typography variant="body2" component="p" gutterBottom><strong>Ruling Style:</strong> {settlement.rulingStyle || "N/A"}</Typography>
                    <Typography variant="body2" component="p" gutterBottom><strong>Wealth:</strong> {settlement.wealth || "N/A"}</Typography>
                    <Typography variant="body2" component="p" gutterBottom sx={{ whiteSpace: 'pre-line' }}><strong>Trade Notes:</strong> {settlement.tradeNotes || "N/A"}</Typography>
                </SettlementAccordion>

                
                {/* Culture & Society */}
                <SettlementAccordion title="Culture & Society" defaultExpanded>
                    <Typography variant="body2" component="p">
                        <strong>Domains:</strong>
                    </Typography>
                    <Box sx={{marginBottom: 1}}>
                        {Array.isArray(settlement.domains) && settlement.domains.length > 0 ? (
                            <Stack direction="row" spacing={1} component="span" useFlexGap sx={{ flexWrap: "wrap", mt: 0.5 }}>
                            {settlement.domains.map((domain) => (
                                <Chip key={domain} label={domain} size="small" sx={{ my: 0.25 }} />
                            ))}
                            </Stack>
                        ) : (
                            "N/A"
                        )}
                    </Box>
                    <Typography variant="body2" component="p" gutterBottom sx={{ whiteSpace: 'pre-line' }}><strong>Criminal Activity:</strong> {settlement.crime?.length ? settlement.crime.join(", ") : "N/A"}</Typography>
                    <Typography variant="body2" component="p" gutterBottom sx={{ whiteSpace: 'pre-line' }}><strong>Holidays:</strong> {settlement.holidays || "N/A"}</Typography>
                    <Typography variant="body2" component="p" gutterBottom sx={{ whiteSpace: 'pre-line' }}><strong>Folklore:</strong> {settlement.folklore || "N/A"}</Typography>
                    
                </SettlementAccordion>

                {/* Notes */}
                <SettlementAccordion title="Description & Notes" defaultExpanded>
                    <Typography variant="body2" component="p" gutterBottom sx={{ whiteSpace: 'pre-line' }}><strong>Public Notes:</strong> {settlement.publicNotes || "N/A"}</Typography>
                    
                    { ( (user?.id === settlement.userId) || (campaignPermissions !== null && campaignPermissions?.isOwner === true) ) &&  (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" component="p" gutterBottom sx={{ whiteSpace: 'pre-line' }}><strong>GM Notes:</strong> {settlement.gmNotes || "N/A"}</Typography>
                        </>
                    ) }
                </SettlementAccordion>
            </DialogContent>

            <Box display="flex" justifyContent="flex-end" p={2}>
                <Button variant="outlined" onClick={onClose}>Close</Button>
            </Box>
        </Dialog>
    )
}