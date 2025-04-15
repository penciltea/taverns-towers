import { Stack, Chip, Button } from "@mui/material";
import GridContainer from "@/components/grid/GridContainer";
import GridItem from "@/components/grid/GridItem";

interface LocationListProps {
  locations: { image: string; _id: string; name: string; tags: string[] }[];
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
      <GridContainer>
        {locations.map((location, index) => (
          <GridItem key={index} link={`/locations/${location._id}`} title={location.name} image={location.image} tags={location.tags} />
        ))}
      </GridContainer>
    </>
  );
}
