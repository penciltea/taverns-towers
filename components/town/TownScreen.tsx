import { Box, Stack, Typography, Grid } from "@mui/material";
import TownDetails from "@/components/town/TownDetails";
import TownActions from "@/components/town/TownActions";
import LocationList from "@/components/location/LocationList";
import AddLocationButton from "@/components/town/AddLocationButton";

const categories = [ "Taverns & Inns", "Temples & Shrines", "Shopping", "Crafts & Services", "Government", "Entertainment", "Medical & Alchemical", "Magical", "Criminal", "Miscellaneous" ];

const DUMMY_TOWN = {
  name: "Town A",
  population: "10,000",
  leadership: "John Smith",
  wealth: "Average"
};

const DUMMY_LOCATIONS = [
  { image: "https://picsum.photos/200", name: "Location A", tags: ["Taverns & Inns"] },
  { image: "https://picsum.photos/200", name: "Location B", tags: ["Taverns & Inns", "Entertainment"] },
  { image: "https://picsum.photos/200", name: "Location C", tags: ["Shopping", "Crafts & Services"] },
  { image: "https://picsum.photos/200", name: "Location D", tags: ["Temples & Shrines", "Crafts & Services"] }
];

export default function TownScreen() {
  return (
    <>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h4">Town Name</Typography>
        <TownActions />
      </Stack>

      <Grid container spacing={2}>
        {/* Top half */}
        <Grid size={{xs: 12, md: 4}}>
          <TownDetails town={DUMMY_TOWN} />
        </Grid>
        <Grid size={{xs: 12, md: 8 }}>
          <Typography variant="h5" sx={{ paddingBottom: 2 }}>Map</Typography>
          <Box>
            <img src="https://picsum.photos/900/400" alt="placeholder" width="100%" />
          </Box>
        </Grid>

        {/* Bottom half */}
        <Grid size={{xs: 12}}>
          <Typography variant="h5">Locations</Typography>
          <LocationList locations={DUMMY_LOCATIONS} categories={categories} />
        </Grid>
      </Grid>

      <AddLocationButton />
    </>
  );
}
