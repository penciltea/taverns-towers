'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { signOut } from 'next-auth/react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Avatar, Divider, IconButton, Box } from '@mui/material';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useUIStore } from '@/store/uiStore';
import MenuIcon from '@mui/icons-material/Menu';
import { capitalizeFirstLetter } from '@/lib/util/stringFormats';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


export default function Header() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const toggleDrawer = useUIStore((state) => state.toggleDrawer);

  const user = useAuthStore(state => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');    
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, display: { xs: 'inline-flex', md: 'inline-flex' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          RealmFoundry
        </Typography>

        { /* Auth Section */ }
        { user ? (
          <>
            <Button
              color="inherit"
              onClick={handleUserMenuClick}
              aria-controls={anchorEl ? 'user-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            >
              <Avatar sx={{ width: 26, height: 26, mr: 1 }}><PersonOutlineIcon /></Avatar>
              Hi {user.username}!
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>Tier: {capitalizeFirstLetter(user.tier)}</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleNavigate('/account/settings')}>Account Settings</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }} >
            <Button variant="outlined" color="inherit" size="small" onClick={() => handleNavigate('/auth/login')} >
              Login
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={() => handleNavigate('/auth/register')} >
              Register
            </Button>
          </Box>
        )
        }
      </Toolbar>
    </AppBar>
  );
}
