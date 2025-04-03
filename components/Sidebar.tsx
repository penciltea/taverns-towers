'use client'
import { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Typography, Button, Box, Toolbar } from "@mui/material";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  interface townInterface {
    name: string
  }

  const townData = [
    { name: "town 1" },
    { name: "town 2" },
    { name: "town 3" }
  ]

  return (
    <Drawer anchor="left" variant="permanent" open={open} onClose={toggleDrawer} sx={{py: 2, width: '180px', marginRight: 2}}>
        <Toolbar />
        <Box sx={{overflow: 'auto', p: 2, width: '180px'}}>
            <Typography variant="h5">My Towns</Typography>
            <List>
                {townData.map((town: townInterface, index: number) => (
                    <ListItem key={index} disablePadding>
                        <ListItemText 
                            primary={
                                <Typography> {town.name} </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
  );
}
