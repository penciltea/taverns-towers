'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Avatar, Divider, IconButton, Box, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@/lib/util/stringFormats';
import { userTier } from '@/constants/user.options';

export default function Header() {
  const router = useRouter();
  const theme = useTheme();
  const toggleDrawer = useUIStore((state) => state.toggleDrawer);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user = useAuthStore((state) => state.user);

  const displayName = user?.username || "Traveler";
  const displayTier = capitalizeFirstLetter(user?.tier ?? userTier[0]);

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
  };

  const headerTextColor = theme.palette.mode === "light" ? "#1d2a3b" : "inherit";

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, color: headerTextColor }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, color: headerTextColor }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>RealmFoundry</Link>
        </Typography>

        {user ? (
          <>
            <Button
              color="inherit"
              onClick={handleUserMenuClick}
              aria-controls={anchorEl ? 'user-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              sx={{ color: headerTextColor }}
            >
              <Avatar sx={{ width: 26, height: 26, mr: 1 }}>
                <PersonOutlineIcon />
              </Avatar>
              Hi, {displayName}!
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>Tier: {displayTier}</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleNavigate('/account/dashboard')}>Account Dashboard</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Button variant="outlined" color="inherit" size="small" sx={{ color: headerTextColor }} onClick={() => handleNavigate('/auth/login')}>
              Login
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={() => handleNavigate('/auth/register')}>
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
