import { Box, Chip, Button, Typography } from "@mui/material";
import GridContainer from "@/components/grid/GridContainer";
import GridItem from "@/components/grid/GridItem";
import { LOCATION_CATEGORIES } from "@/constants/locationOptions";
import { LocationListProps } from "@/interfaces/location.interface";

export default function LocationList({ locations }: LocationListProps) {

  return (
    <>
      <Typography variant="h6" sx={{width: '100%', marginTop: 2}}>Filter by Category </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 3, sm: 3, md: 1 }, // Increased gap for mobile devices
          justifyContent: {xs: 'center', md: 'flex-start'},
          margin: 1
        }}
      >
        {LOCATION_CATEGORIES.map((category) => (
          <Chip
            key={category.value}
            label={category.label}
            variant="outlined"
            sx={{
              cursor: 'pointer',
              padding: { xs: '10px 16px', sm: '12px 18px' }, // Add more padding for better touch targets on mobile
              fontSize: { xs: '0.75rem', sm: '1rem' }, // Adjust font size for mobile devices
            }}
          />
        ))}
      </Box>
      <Button variant="text" sx={{ margin: "0 auto", display: "block" }}>View All</Button>
      <GridContainer>
        {locations.length <= 0 && <Typography variant="subtitle1" sx={{textAlign: 'center', margin: '0 auto'}}>No locations have been added yet!</Typography>}
        {locations.map((location, index) => (
          <GridItem key={index} link={`/locations/${location._id}`} title={location.name} subtitle={location.type} image={location.image} tags={location.tags} />
        ))}
      </GridContainer>
    </>
  );
}
