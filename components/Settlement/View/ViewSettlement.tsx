'use client';

import { Box, Grid, Stack, Typography, Divider } from "@mui/material";
import { useUIStore } from '@/store/uiStore';
import { Settlement } from '@/interfaces/settlement.interface';
import SettlementDetails from "@/components/Settlement/View/SettlementDetails";
import SettlementActions from "@/components/Settlement/View/SettlementActions";
import SiteList from "@/components/Settlement/View/SiteList";
import FabButton from "@/components/Common/fabButton";
import SettlementConnections from "./SettlementConnections";
import Image from "next/image";

interface Props {
  settlement: Settlement;
}

export default function ViewSettlement({ settlement }: Props) {
  const { setOpenDialog } = useUIStore();

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, justifyContent: 'space-between' }}>
        <Typography variant="h3" component="h1">
          {settlement.name}
        </Typography>

        {settlement && <SettlementActions {...settlement} />}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {/* Settlement Details */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SettlementDetails settlement={settlement} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" component="h3" sx={{ paddingBottom: 2, marginTop: 1 }}>
            Map
          </Typography>
           <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center' }}>
            {settlement.map ? (
              <Box sx={{ width: '100%', position: 'relative', height: '300px' }}>
                <Image
                  priority
                  src={settlement.map}
                  alt={`Map of ${settlement.name}`}
                  fill
                  style={{
                    borderRadius: '16px',
                    objectFit: 'cover',
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>
            ) : (
              <Typography variant="body1">No map image uploaded.</Typography>
            )}
          </Box>
        </Grid>

        {/* Site List */}
        <Grid size={{xs: 12}} sx={{ marginTop: 2 }}>
          <SiteList
            settlementId={settlement._id}
          />
        </Grid>

         {/* Connections List */}
        <Grid size={{xs: 12}} sx={{ marginTop: 2 }}>
          <SettlementConnections connections={settlement.connections} />
        </Grid>
      </Grid>



      <FabButton label="Add Site" 
        onClick={() => setOpenDialog('siteTypeDialog', { 
          dialogMode: 'direct', 
          settlementId: settlement._id, 
        })} 
      />
    </>
  );
}
