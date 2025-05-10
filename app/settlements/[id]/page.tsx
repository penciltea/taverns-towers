'use client';

import { use } from "react";
import { Box, Grid, Stack, Typography, Skeleton, Divider } from "@mui/material";
import Image from "next/image";
import { useUIStore } from '@/store/uiStore';
import { useSettlementLoader } from '@/hooks/useSettlementLoader';
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import SettlementDetails from "@/components/Settlement/View/SettlementDetails";
import SettlementActions from "@/components/Settlement/View/SettlementActions";
import SightList from "@/components/Settlement/View/SightList";
import FabButton from "@/components/Common/fabButton";
import SightTypeDialog from "@/components/Sight/Dialog/SightTypeDialog";

export default function ViewSettlementPage({ params }: { params: Promise<{ id: string }> }) {
  const { openDialog, closeDialog } = useUIStore();
  const { id } = use(params);
  const { settlement, loading, deleteSight } = useSettlementLoader(id);

  if (!loading && !settlement) {
    return <Typography>Settlement not found!</Typography>;
  }

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, justifyContent: 'space-between' }}>
        <Typography variant="h3" component="h1">
          <SkeletonLoader loading={loading} skeleton={<Skeleton width={250} />}>
            {settlement?.name}
          </SkeletonLoader>
        </Typography>

        <SkeletonLoader
          loading={loading}
          skeleton={<Skeleton variant="rectangular" width={120} height={40} />}
        >
          {settlement && <SettlementActions settlementId={settlement._id} />}
        </SkeletonLoader>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {/* Top Half */}
        <Grid size={{xs: 12, md: 4}}>
          {loading || !settlement ? (
            <Skeleton width="100%" height={200} />
          ) : (
            <SettlementDetails settlement={settlement} />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" component="h3" sx={{ paddingBottom: 2, marginTop: 1 }}>
            Map
          </Typography>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center' }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
            ) : settlement?.map ? (
              <Box sx={{ width: '100%', position: 'relative', height: '300px' }}>
                <Image
                  src={settlement.map}
                  alt="Your settlement map"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)', objectFit: "cover" }}
                />
              </Box>
            ) : (
              <Typography variant="body1">No map image uploaded.</Typography>
            )}
          </Box>
        </Grid>

        {/* Bottom Half */}
        <Grid size={{xs: 12}} sx={{marginTop: 4}}>
          <SkeletonLoader
            loading={loading}
            skeleton={
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Simulate 3 loading "sight cards" */}
                <Skeleton variant="rectangular" height={100} width={'30%'} />
                <Skeleton variant="rectangular" height={100} width={'30%'} />
                <Skeleton variant="rectangular" height={100} width={'30%'} />
              </Stack>
            }
          >
            <SightList
              settlementId={id}
              onDelete={(id: string) => {
                deleteSight(id);
              }}
            />
          </SkeletonLoader>
        </Grid>
      </Grid>

      <FabButton label="Add Sight" onClick={() => useUIStore.getState().setOpenDialog('sightTypeDialog')} />

      {openDialog === 'sightTypeDialog' && (
        <SightTypeDialog open onClose={closeDialog} />
      )}
    </>
  );
}
