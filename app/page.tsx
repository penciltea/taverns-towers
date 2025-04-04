'use client'
import { Box, Typography, Stack, Button, List, ListItem, ListItemText, Grid, Chip, Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {

  const categories = ['Taverns & Inns', 'Temples & Shrines', 'Shopping', 'Crafts & Services', 'Government', 'Entertainment', 'Medical & Alchemical', 'Magical', 'Criminal', 'Miscellaneous'];

  interface TownDetails {
    name: string,
    size: string,
    population: string,
    leadership: string,
    wealth: string
  };

  const DUMMY_TOWN = {
    name: "Town A",
    population: "10,000",
    leadership: "John Smith",
    wealth: "Average"
  }

  interface Location {
    image: string,
    name: string,
    tags: string[]
  };

  const DUMMY_LOCATIONS = [
    {
      image: 'https://picsum.photos/200',
      name: 'Location A',
      tags: ['Taverns & Inns']
    },
    {
      image: 'https://picsum.photos/200',
      name: 'Location B',
      tags: ['Taverns & Inns', 'Entertainment']
    },
    {
      image: 'https://picsum.photos/200',
      name: 'Location C',
      tags: ['Shopping', 'Crafts & Services']
    },
    {
      image: 'https://picsum.photos/200',
      name: 'Location D',
      tags: ['Temples & Shrines', 'Crafts & Services']
    }
  ]

  return (
    <>
      
      <Stack direction="row" sx={{justifyContent: "space-between"}}>
        <Typography variant="h4">Town Name</Typography>
        <Box>  
          <Button sx={{mx: 1}} variant="outlined" startIcon={<EditIcon />}> Edit </Button>
          <Button sx={{mx: 1}} variant="text" startIcon={<DeleteIcon />}> Delete </Button>
        </Box>
      </Stack>
      
      <Grid container spacing={2}>
        {/* Top half */}
        <Grid size={4}>
          <Typography variant="h5"> Details </Typography>
          <List sx={{listStyleType: 'disc', listStylePosition: 'inside'}}>
            {Object.entries(DUMMY_TOWN).map(([key, value]) => (
              <ListItem key={key} sx={{display: 'list-item'}}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </ListItem>
            ))}
          </List>
          <Button variant="outlined">Additional Details</Button>
        </Grid>
        <Grid size={8}>
          <Typography variant="h5" sx={{paddingBottom: 2}}> Map </Typography>
          <Box>
            <img src="https://picsum.photos/900/400" alt="placeholder" />
          </Box>
        </Grid>

        {/* Bottom half */}
        <Grid size={12}>
          <Typography variant="h5"> Locations </Typography>

          <Stack direction="row" sx={{overflow: 'auto', py: 2}}>
            {categories.map((category: string) => (
              <Chip key={category} label={category} variant="outlined" sx={{mx: 0.5, cursor: 'pointer'}} />
            ))}
          </Stack>
          <Button variant="text" sx={{margin: '0 auto', display: 'block'}}>view all</Button>

            <Grid container sx={{py: 4, cursor: 'pointer'}} spacing={2}>
              {DUMMY_LOCATIONS.map((location: Location, index: number) => (
                <Grid size={3} key={index} sx={{justifyItems: 'center'}}>
                  <img src={location.image} alt={location.name} />
                  <Typography variant="body1">{location.name}</Typography>
                  <Typography variant="body1">
                    {location.tags.map((tag: string, index) => (
                      <span key={index}>{tag} {index < location.tags.length - 1 && <span>, </span> }</span>
                    ))}

                  </Typography>
                </Grid>
              ))}
            </Grid>
        </Grid>
      </Grid>
      <Fab 
        variant="extended"
        color="primary" 
        aria-label="add location" 
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon /> Add Location
      </Fab>
    </>
  );
}
