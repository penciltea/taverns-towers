'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Drawer, List, ListItem, ListItemText, Typography, Button, Box, Toolbar, Divider } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import AddIcon from '@mui/icons-material/Add';
import AddTownDialog from "../dialog/AddTownDialog";
import getAllTowns from "@/lib/api/towns/getAll";
import { Town } from "@/interfaces/town.interface";

export default function Sidebar() {
  const router = useRouter();
  const { isDrawerOpen, toggleDrawer, openDialog, closeDialog } = useUIStore();

  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTowns = async () => {
      try {
        const data = await getAllTowns();
        setTowns(data.towns);
      } catch (err) {
        console.error("Error fetching towns:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTowns();
  }, []);

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
            {!towns.length && <Typography>No towns found.</Typography>}
            {towns.length && 
              <List>
                  {towns.map( (town: Town, index: number) => (
                    <Box key={index} >
                      <ListItem 
                        sx={{cursor: 'pointer'}}
                        onClick={() => handleViewTownClick(`${town._id}`)}
                      >
                          <ListItemText 
                              primary={
                                  <Typography> {town.name} </Typography>
                              }
                          />
                      </ListItem>
                      { index < towns.length - 1 && <Divider />} 
                    </Box>
                  ) )}
              </List>
            }
        </Box>
    </Drawer>
    {openDialog === 'addTownDialog' && (
      <AddTownDialog open onClose={closeDialog} />
    )}
    </>
  );
}
