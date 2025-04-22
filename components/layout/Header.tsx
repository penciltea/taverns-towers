'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useUIStore } from '@/store/uiStore';
import LocationTypeDialog from '@/components/Dialog/locationTypeDialog';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {openDialog, closeDialog} = useUIStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuType, setMenuType] = useState<'towns' | 'locations' | 'npcs' | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, type: typeof menuType) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const handleLocationDialog = () => {
    useUIStore.getState().setOpenDialog('locationTypeDialog')
    handleMenuClose();
  };

  return (
    <>
    <AppBar position="fixed" color="primary" elevation={1}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? 1 : 0,
          py: isMobile ? 1.5 : 0.5,
        }}
      >
        {/* Logo */}
        <Typography variant="h6" component={Link} href="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          Taverns & Towers
        </Typography>

        {/* Navigation Buttons */}
        <Box display="flex" gap={2}>
            {/* Towns */}
            <Button
                onClick={(e) => handleMenuOpen(e, 'towns')}
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
            >
                Towns
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuType === 'towns'}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleNavigate('/towns/all')}>View All Towns</MenuItem>
                <MenuItem onClick={() => handleNavigate('/towns/new')}>Create Town</MenuItem>
            </Menu>

            {/* Locations */}
            <Button
                onClick={(e) => handleMenuOpen(e, 'locations')}
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
            >
                Locations
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuType === 'locations'}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleNavigate('/locations/all')}>View Your Locations</MenuItem>
                <MenuItem onClick={handleLocationDialog}>Create Location</MenuItem>
            </Menu>

            {/* NPCs */}
            {/*
            <Button
                onClick={(e) => handleMenuOpen(e, 'npcs')}
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
            >
                NPCs
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuType === 'npcs'}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleNavigate('/npcs/all')}>View Your NPCs</MenuItem>
                <MenuItem onClick={() => handleNavigate('/npcs')}>Create NPC</MenuItem>
            </Menu>
            */}
        </Box>

        {/* Auth Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="inherit" size="small">
            Login
          </Button>
          <Button variant="contained" color="secondary" size="small">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

    {openDialog === 'locationTypeDialog' && (
        <LocationTypeDialog open onClose={closeDialog} />
    )}
    </>
  );
}
