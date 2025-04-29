'use client';

import { use } from "react";
import { Box, Grid, Stack, Typography, Skeleton, Divider } from "@mui/material";
import Image from "next/image";
import { useUIStore } from '@/store/uiStore';
import { useTownLoader } from '@/hooks/useTownLoader';
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import TownDetails from "@/components/Town/View/TownDetails";
import TownActions from "@/components/Town/View/TownActions";
import LocationList from "@/components/Town/View/LocationList";
import FabButton from "@/components/Common/fabButton";
import LocationTypeDialog from "@/components/Location/Dialog/locationTypeDialog";

export default function ViewTownPage({ params }: { params: Promise<{ id: string }> }) {
  const { openDialog, closeDialog } = useUIStore();
  const { id } = use(params);
  const tId = id;
  const { town, locations, loading, deleteLocation } = useTownLoader(tId);

  if (!loading && !town) {
    return <Typography>Town not found!</Typography>;
  }

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, justifyContent: 'space-between' }}>
        <Typography variant="h4">
          <SkeletonLoader loading={loading} skeleton={<Skeleton width={250} />}>
            {town?.name}
          </SkeletonLoader>
        </Typography>

        <SkeletonLoader
          loading={loading}
          skeleton={<Skeleton variant="rectangular" width={120} height={40} />}
        >
          {town && <TownActions townId={town._id} />}
        </SkeletonLoader>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {/* Top Half */}
        <Grid size={{xs: 12, md: 4}}>
          {loading || !town ? (
            <Skeleton width="100%" height={200} />
          ) : (
            <TownDetails town={town} />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h5" sx={{ paddingBottom: 2, marginTop: 1 }}>
            Map
          </Typography>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center' }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
            ) : town?.map ? (
              <Box sx={{ width: '100%', position: 'relative', height: '300px' }}>
                <Image
                  src={town.map}
                  alt="Your town map"
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
        <Grid size={{xs: 12}}>
          <Typography variant="h5">Locations</Typography>
          <SkeletonLoader
            loading={loading}
            skeleton={
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Simulate 3 loading "location cards" */}
                <Skeleton variant="rectangular" height={100} width={'30%'} />
                <Skeleton variant="rectangular" height={100} width={'30%'} />
                <Skeleton variant="rectangular" height={100} width={'30%'} />
              </Stack>
            }
          >
            <LocationList
              townId={tId}
              onDelete={(id: string) => {
                deleteLocation(id);
              }}
            />
          </SkeletonLoader>
        </Grid>
      </Grid>

      <FabButton label="Add Location" onClick={() => useUIStore.getState().setOpenDialog('locationTypeDialog')} />

      {openDialog === 'locationTypeDialog' && (
        <LocationTypeDialog open onClose={closeDialog} />
      )}
    </>
  );
}
