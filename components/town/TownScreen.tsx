'use client'

import { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import TownDetails from "@/components/town/TownDetails";
import TownActions from "@/components/town/TownActions";
import LocationList from "@/components/town/LocationList";
import {getTownById} from "@/lib/actions/town.actions";
import { Town } from "@/interfaces/town.interface";
import FabButton from "@/components/ui/fabButton";
import { useUIStore } from '@/store/uiStore';
import LocationTypeDialog from "../dialog/locationTypeDialog";
import { getLocationsByTown } from "@/lib/actions/location.action";

const categories = [ "Taverns & Inns", "Temples & Shrines", "Shopping", "Crafts & Services", "Government", "Entertainment", "Medical & Alchemical", "Magical", "Criminal", "Miscellaneous" ];

const DUMMY_LOCATIONS = [
  { image: "https://picsum.photos/200", _id: '123', name: "Location A", tags: ["Taverns & Inns"] },
  { image: "https://picsum.photos/200", _id: '234',name: "Location B", tags: ["Taverns & Inns", "Entertainment"] },
  { image: "https://picsum.photos/200", _id: '345',name: "Location C", tags: ["Shopping", "Crafts & Services"] },
  { image: "https://picsum.photos/200", _id: '456',name: "Location D", tags: ["Temples & Shrines", "Crafts & Services"] }
];

interface TownProps {
  townId: string;
}



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
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
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
          <Box sx={{maxWidth: 1/2, alignItems: 'center'}}>
            {!town.map && <Typography variant="body1">No image was uploaded.</Typography>}
            {town.map && 
              <img src={town.map} alt="your town map image" width="100%" />
            }
          </Box>
        </Grid>

        {/* Bottom half */}
        <Grid size={{xs: 12}}>
          <Typography variant="h5">Locations</Typography>
          <LocationList locations={locations} categories={categories} />
        </Grid>
      </Grid>

      <FabButton label="Add Location" onClick={() => { useUIStore.getState().setOpenDialog('locationTypeDialog') }} />

        {openDialog === 'locationTypeDialog' && (
            <LocationTypeDialog open onClose={closeDialog} />
        )}
    </>
  );
}
