'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Stack, Typography, Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import TownDetails from "@/components/Town/View/TownDetails";
import TownActions from "@/components/Town/View/TownActions";
import LocationList from "@/components/Town/View/LocationList";
import {getTownById} from "@/lib/actions/town.actions";
import { Town, TownProps } from "@/interfaces/town.interface";
import FabButton from "@/components/Common/fabButton";
import { useUIStore } from '@/store/uiStore';
import LocationTypeDialog from "../../Dialog/locationTypeDialog";
import { getLocationsByTown } from "@/lib/actions/location.action";

export default function TownScreen({townId}: TownProps) {
  const [town, setTown] = useState<Town | undefined>(undefined);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {openDialog, closeDialog} = useUIStore();
  
  useEffect(() => {
    const loadTownAndLocations = async () => {
      try {
        const [townData, locationData] = await Promise.all([
          getTownById(townId),
          getLocationsByTown(townId)
        ]);
  
        if (townData) setTown(townData);
        if (locationData) setLocations(locationData);

        console.log(locations);

      } catch (err) {
        console.error("Error fetching town or locations:", err);
      } finally {
        setLoading(false);
      }
    };
  
    loadTownAndLocations();
  }, [townId]);
  
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!town) {
    return <Typography>Town not found!</Typography>;
  }

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: { sm: 'space-between' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 2,
        }}
      >
        <Typography variant="h4">{town?.name}</Typography>
        <TownActions townId={townId} />
      </Stack>
      <Divider sx={{my: 2}}/>

      <Grid container spacing={2}>
        {/* Top half */}
        <Grid size={{xs: 12, md: 4}}>
          <TownDetails town={town} />
        </Grid>
        <Grid size={{xs: 12, md: 8 }}>
          <Typography variant="h5" sx={{ paddingBottom: 2, marginTop: 1 }}>Map</Typography>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center' }}>
            {!town.map ? (
              <Typography variant="body1">No image was uploaded.</Typography>
            ) : (
              <Box sx={{ width: '100%', position: 'relative', height: '300px' }}>
                <Image
                  src={town.map}
                  alt="Your town map image"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                    objectFit: "cover"
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Bottom half */}
        <Grid size={{xs: 12}}>
          <Typography variant="h5">Locations</Typography>
          <LocationList locations={locations} />
        </Grid>
      </Grid>

      <FabButton label="Add Location" onClick={() => { useUIStore.getState().setOpenDialog('locationTypeDialog') }} />

        {openDialog === 'locationTypeDialog' && (
            <LocationTypeDialog open onClose={closeDialog} />
        )}
    </>
  );
}
