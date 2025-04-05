'use client'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ModeSwitch from './mode-switch';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header(){
    return (
        <AppBar position="sticky" sx={{ zIndex: 1201 /* MUI drawer zindex is 1200, setting this higher to lay over drawer */ }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton size="large" aria-label="View towns" sx={{marginRight: 1}}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Taverns & Towers
                </Typography>
                <Button variant="outlined" color="inherit"> Login </Button>
            </Toolbar>
        </AppBar>
    )
}