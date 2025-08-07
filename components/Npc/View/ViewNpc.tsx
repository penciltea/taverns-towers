'use client';

import { useSession } from 'next-auth/react';
import { useUIStore } from '@/store/uiStore';
import { Box, Grid, Stack, Typography, Divider } from "@mui/material";
import { Npc } from "@/interfaces/npc.interface";
import NpcActions from './NpcActions';
import NpcDetails from './NpcDetails';
import NpcConnections from './NpcConnections';

interface Props {
  npc: Npc;
}


export default function ViewNpc({ npc }: Props){
  const { setOpenDialog } = useUIStore();
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;

    return (
        <>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, justifyContent: 'space-between' }}>
            <Typography variant="h3" component="h1">
              {npc.name}
            </Typography>
    
            {npc && <NpcActions {...npc} />}
          </Stack>
    
          <Divider sx={{ my: 2 }} />
    
          <Grid container spacing={2}>
            {/* Npc Details */}
            <Grid size={{ xs: 12, md: 4 }}>
              <NpcDetails npc={npc} />
            </Grid>
    
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h4" component="h3" sx={{ paddingBottom: 2, marginTop: 1 }}>
                Portrait
              </Typography>
              <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center' }}>
                {npc.image ? (
                  <Box sx={{ width: '100%', position: 'relative', height: '300px' }}>
                    <img
                      src={npc.image}
                      alt="Your NPC Portrait"
                      style={{
                        borderRadius: '16px',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body1">No NPC portrait uploaded.</Typography>
                )}
              </Box>
            </Grid>

            <Grid size={{xs: 12}} sx={{ marginTop: 4 }}>
              <Box sx={{my: 2}}>
                <Typography variant="h5" component="h3">Description</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="body1" component="p">{npc.description ? npc.description : "N/A"}</Typography>
              </Box>

              <Box sx={{my: 2}}>
                <Typography variant="h5" component="h4">Public Notes</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="body1" component="p">{npc.publicNotes ? npc.publicNotes : "N/A" }</Typography>
              </Box>

              { user?.id === npc.userId &&  (
                <Box sx={{my: 2}}>
                  <Typography variant="h5" component="h5">GM Notes</Typography>
                  <Divider sx={{mb: 2}} />
                  <Typography variant="body1" component="p">{npc.gmNotes ? npc.gmNotes : "N/A" }</Typography>
                </Box>
              ) }
            </Grid>

            <NpcConnections connections={npc.connections} />

          </Grid>
        </>
    )
}