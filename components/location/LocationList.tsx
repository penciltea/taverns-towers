import { Grid, Stack, Chip, Button } from "@mui/material";
import LocationCard from "@/components/location/LocationCard";

interface LocationListProps {
  locations: { image: string; name: string; tags: string[] }[];
  categories: string[];
}

export default function LocationList({ locations, categories }: LocationListProps) {
  return (
    <>
      <Stack direction="row" sx={{ overflow: "auto", py: 2 }}>
        {categories.map((category) => (
          <Chip key={category} label={category} variant="outlined" sx={{ mx: 0.5, cursor: "pointer" }} />
        ))}
      </Stack>
      <Button variant="text" sx={{ margin: "0 auto", display: "block" }}>View All</Button>
      <Grid container spacing={2} sx={{ py: 4, cursor: "pointer" }}>
        {locations.map((location, index) => (
          <LocationCard key={index} {...location} />
        ))}
      </Grid>
    </>
  );
}
