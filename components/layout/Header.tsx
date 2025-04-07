'use client'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import ModeSwitch from './mode-switch';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header(){
    const toggleDrawer = useUIStore((state) => state.toggleDrawer);

    return (
        <AppBar position="sticky" sx={{ zIndex: 1201 /* MUI drawer zindex is 1200, setting this higher to lay over drawer */ }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button variant="text" startIcon={<MenuIcon />} sx={{marginRight: 1}} onClick={toggleDrawer}> Towns</Button>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Taverns & Towers
                </Typography>
                <Button variant="outlined"> Login </Button>
            </Toolbar>
        </AppBar>
    )
}