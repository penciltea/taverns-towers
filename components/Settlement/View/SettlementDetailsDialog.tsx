'use client'

import { useSession } from 'next-auth/react';
import { Dialog, DialogTitle, DialogContent, Divider, Box, Button, Typography, Chip, Stack } from '@mui/material';
import { SettlementDialogProps } from "@/interfaces/settlement.interface";
import SettlementAccordion from "./SettlementAccordion";
import { useOwnedNpcsQuery } from '@/hooks/npc/npc.query';
import { Npc } from '@/interfaces/npc.interface';


export default function SettlementDetailsDialog({ open, onClose, settlement }: SettlementDialogProps) {
    const { data: session } = useSession();
    const user = session?.user ? { id: session.user.id } : null;

    // Fetch all NPCs that could be leaders (or your full owned NPC list)
    const { data: npcData } = useOwnedNpcsQuery({ page: 1, limit: 999 });
    const npcMap = new Map<string, Npc>(npcData?.npcs.map((npc) => [npc._id, npc]) || []);

    const leaderNames = settlement.leader?.map((id) => npcMap.get(id)?.name || "Unnamed NPC").join(", ") || "N/A";

    return(
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper" aria-labelledby="settlement-dialog-title">
            <DialogTitle id="settlement-dialog-title">Additional Details - {settlement.name}</DialogTitle>
            <DialogContent dividers>
                {/* Leadership & Wealth */}
                <SettlementAccordion title="Leadership & Wealth" defaultExpanded>
                    <Typography variant="body2" component="p"><strong>Leader(s):</strong> {leaderNames}</Typography>
                    <Typography variant="body2" component="p"><strong>Ruling Style:</strong> {settlement.rulingStyle || "N/A"}</Typography>
                    <Typography variant="body2" component="p"><strong>Trade Notes:</strong> {settlement.tradeNotes || "N/A"}</Typography>
                    <Typography variant="body2" component="p"><strong>Wealth:</strong> {settlement.wealth || "N/A"}</Typography>
                </SettlementAccordion>

                
                {/* Culture & Society */}
                <SettlementAccordion title="Culture & Society" defaultExpanded>
                    <Typography variant="body2" component="p">
                        <strong>Domains:</strong>
                    </Typography>
                    <Box sx={{marginBottom: 1}}>
                        {Array.isArray(settlement.domains) && settlement.domains.length > 0 ? (
                            <Stack direction="row" spacing={1} component="span" sx={{ flexWrap: "wrap", mt: 0.5 }}>
                            {settlement.domains.map((domain) => (
                                <Chip key={domain} label={domain} size="small" />
                            ))}
                            </Stack>
                        ) : (
                            "N/A"
                        )}
                    </Box>
                    <Typography variant="body2" component="p"><strong>Holidays:</strong> {settlement.holidays || "N/A"}</Typography>
                    <Typography variant="body2" component="p"><strong>Folklore:</strong> {settlement.folklore || "N/A"}</Typography>
                    <Typography variant="body2" component="p"><strong>Criminal Activity:</strong> {settlement.crime?.length ? settlement.crime.join(", ") : "N/A"}</Typography>
                </SettlementAccordion>

                {/* Notes */}
                <SettlementAccordion title="Notes" defaultExpanded>
                    <Typography variant="body2" component="p"><strong>Public Notes:</strong> {settlement.publicNotes || "N/A"}</Typography>
                    
                    { user?.id === settlement.userId &&  (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" component="p"><strong>GM Notes:</strong> {settlement.gmNotes || "N/A"}</Typography>
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