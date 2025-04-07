'use client'
import { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Typography, Button, Box, Toolbar, Divider } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import AddIcon from '@mui/icons-material/Add';

export default function Sidebar() {
  const { isDrawerOpen, toggleDrawer } = useUIStore();

  interface townInterface {
    name: string
  }

  const townData = [
    { name: "town 1" },
    { name: "town 2" },
    { name: "town 3" }
  ]

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer} sx={{p: 2, width: '180px', marginRight: 2}}>
        <Toolbar />
        <Box sx={{overflow: 'auto', p: 2, width: '180px'}}>
            <Typography variant="h5">My Towns</Typography>
            <Button variant="outlined" fullWidth startIcon={<AddIcon />} sx={{my: 2}}> Add Town </Button>
            <List>
                {townData.map( (town: townInterface, index: number) => (
                  <Box key={index} >
                    <ListItem sx={{cursor: 'pointer'}}>
                        <ListItemText 
                            primary={
                                <Typography> {town.name} </Typography>
                            }
                        />
                    </ListItem>
                    { index < townData.length - 1 && <Divider />} 
                  </Box>
                ) )}
            </List>
        </Box>
    </Drawer>
  );
}
