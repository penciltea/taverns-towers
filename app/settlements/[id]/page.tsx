'use client';

import { useParams } from "next/navigation";
import { Box, Grid, Stack, Typography, Skeleton, Divider } from "@mui/material";
import Image from "next/image";
import { useUIStore } from '@/store/uiStore';
import { useSettlementLoader } from '@/hooks/settlement/useSettlementLoader';
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import SettlementDetails from "@/components/Settlement/View/SettlementDetails";
import SettlementActions from "@/components/Settlement/View/SettlementActions";
import SiteList from "@/components/Settlement/View/SiteList";
import FabButton from "@/components/Common/fabButton";
import { useAuthStore } from "@/store/authStore";


export default function ViewSettlementPage() {
  const { setOpenDialog } = useUIStore();
  const params = useParams();
  const id = params.id as string;
  const { settlement, loading, deleteSite } = useSettlementLoader(id);
  const user = useAuthStore(state => state.user);
  const isOwner = useAuthStore(state => state.isOwner);

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
          {settlement && isOwner(settlement.userId) && <SettlementActions settlementId={settlement._id} />}
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
                {/* Simulate 3 loading "site cards" */}
                <Skeleton variant="rectangular" height={100} width={'30%'} />
                <Skeleton variant="rectangular" height={100} width={'30%'} />
                <Skeleton variant="rectangular" height={100} width={'30%'} />
              </Stack>
            }
          >
            <SiteList
              settlementId={id}
              onDelete={(id: string) => {
                deleteSite(id);
              }}
            />
          </SkeletonLoader>
        </Grid>
      </Grid>

      <FabButton label="Add Site" onClick={() => setOpenDialog('siteTypeDialog', { dialogMode: 'direct', settlementId: id })} />
    </>
  );
}
