'use client'
import { useRouter } from "next/navigation";
import { Drawer, List, ListItem, ListItemText, Typography, Button, Box, Toolbar, Divider } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import AddIcon from '@mui/icons-material/Add';
import AddTownDialog from "../dialog/AddTownDialog";

export default function Sidebar() {
  const router = useRouter();
  const { isDrawerOpen, toggleDrawer, openDialog, closeDialog } = useUIStore();

  interface townInterface {
    name: string
  }

  const DUMMY_TOWN_DATA = [
    { name: "town 1" },
    { name: "town 2" },
    { name: "town 3" }
  ]

  
  const handleViewTownClick = (townId: string) => {
    toggleDrawer();
    router.push(`/towns/${townId}`)
  }

  return (
    <>
    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer} sx={{p: 2, marginRight: 2}}>
        <Toolbar />
        <Box sx={{overflow: 'auto', p: 2, width: '240px'}}>
            <Typography variant="h5">My Towns</Typography>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<AddIcon />} 
              sx={{mt: 2, mb: 0.5}}
              size="large"
              onClick={() => useUIStore.getState().setOpenDialog('addTownDialog')}
            > 
              Add Town 
            </Button>
            <List>
                {DUMMY_TOWN_DATA.map( (town: townInterface, index: number) => (
                  <Box key={index} >
                    <ListItem 
                      sx={{cursor: 'pointer'}}
                      onClick={() => handleViewTownClick('1')}
                    >
                        <ListItemText 
                            primary={
                                <Typography> {town.name} </Typography>
                            }
                        />
                    </ListItem>
                    { index < DUMMY_TOWN_DATA.length - 1 && <Divider />} 
                  </Box>
                ) )}
            </List>
        </Box>
    </Drawer>
    {openDialog === 'addTownDialog' && (
      <AddTownDialog open onClose={closeDialog} />
    )}
    </>
  );
}
