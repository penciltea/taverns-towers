'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useUIStore } from '@/store/uiStore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
    const router = useRouter();
    const isMobile = useIsMobile();
    const { setOpenDialog } = useUIStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuType, setMenuType] = useState<'settlements' | 'sites' | 'npcs' | 'guilds' | null>(null);

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

  const handleSiteDialog = () => {
    setOpenDialog('siteTypeDialog', { dialogMode: 'global' })
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
              {/* Settlements */}
              <Button
                  onClick={(e) => handleMenuOpen(e, 'settlements')}
                  color="inherit"
                  endIcon={<KeyboardArrowDownIcon />}
              >
                  Settlements
              </Button>
              <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && menuType === 'settlements'}
                  onClose={handleMenuClose}
              >
                  <MenuItem onClick={() => handleNavigate('/settlements/all')}>View All Settlements</MenuItem>
                  <MenuItem onClick={() => handleNavigate('/settlements/new')}>Create Settlement</MenuItem>
              </Menu>

              {/* Sites */}
              <Button
                  onClick={(e) => handleMenuOpen(e, 'sites')}
                  color="inherit"
                  endIcon={<KeyboardArrowDownIcon />}
              >
                  Sites
              </Button>
              <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && menuType === 'sites'}
                  onClose={handleMenuClose}
              >
                  <MenuItem onClick={() => handleNavigate('/sites/')}>View Your Sites</MenuItem>
                  <MenuItem onClick={handleSiteDialog}>Create Site</MenuItem>
              </Menu>

              {/* NPCs */}
              
              <Button
                  onClick={(e) => handleMenuOpen(e, 'npcs')}
                  color="inherit"
                  disabled
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

              {/* Guilds */}
              
              <Button
                  onClick={(e) => handleMenuOpen(e, 'guilds')}
                  color="inherit"
                  disabled
                  endIcon={<KeyboardArrowDownIcon />}
              >
                  Guilds
              </Button>
              <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && menuType === 'guilds'}
                  onClose={handleMenuClose}
              >
                  <MenuItem onClick={() => handleNavigate('/guilds/all')}>View Your Guilds</MenuItem>
                  <MenuItem onClick={() => handleNavigate('/guilds')}>Create Guild</MenuItem>
              </Menu>
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" color="inherit" size="small" onClick={() => handleNavigate('/auth/login')} >
              Login
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={() => handleNavigate('/auth/register')} >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
