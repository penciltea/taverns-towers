import { Box, Typography, Stack, Button, List, ListItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
  return (
    <>
      <Stack direction="row" sx={{justifyContent: "space-between"}}>
        <Typography variant="h4">Town Name</Typography>
        <Box>  
          <Button sx={{mx: 1}} variant="outlined" startIcon={<EditIcon />}> Edit </Button>
          <Button sx={{mx: 1}} variant="text" startIcon={<DeleteIcon />}> Delete </Button>
        </Box>
      </Stack>
      
      <Box sx={{display: 'flex'}}>
        <Box sx={{borderRight: '1px solid #000'}}>
          <Typography variant="h6"> Details </Typography>
          <List sx={{listStyleType: 'disc', listStylePosition: 'inside'}}>
            <ListItem sx={{ display: 'list-item' }}>Size: City</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Population: 10,000</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Leaders: NPC Name</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Wealth Level: Average</ListItem>
          </List>
        </Box>
        <Box sx={{px: 2}}>
          <Typography variant="h6"> Map </Typography>
        </Box>
        </Box>
    </>
  );
}
