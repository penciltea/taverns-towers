'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useUIStore } from '@/store/uiStore';
import SiteTypeDialog from '../Site/Dialog/SiteTypeDialog';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
    const router = useRouter();
    const isMobile = useIsMobile();
    const {openDialog, closeDialog} = useUIStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuType, setMenuType] = useState<'settlements' | 'sites' | 'npcs' | null>(null);

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
    useUIStore.getState().setOpenDialog('siteTypeDialog')
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

      {openDialog === 'siteTypeDialog' && (
          <SiteTypeDialog open onClose={closeDialog} />
      )}
    </>
  );
}
