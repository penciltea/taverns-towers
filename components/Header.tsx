'use client'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ModeSwitch from './mode-switch';

export default function Header(){
    return (
        <AppBar position="sticky" sx={{ zIndex: 1201 /* MUI drawer zindex is 1200, setting this higher to lay over drawer */ }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Taverns & Towers
                </Typography>
                <Button variant="outlined" color="inherit"> Login </Button>
            </Toolbar>
        </AppBar>
    )
}