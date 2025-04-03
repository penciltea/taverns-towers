'use client'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Header(){
    return (
        <Box>
            <AppBar position="sticky" sx={{ zIndex: 1201 /* MUI drawer zindex is 1200, setting this higher to lay over drawer */ }}>
                <Toolbar>
                    <Typography variant="h4" component="div">
                        Taverns & Towers
                    </Typography>
                    <Button variant="outlined" color="inherit"> Login </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}