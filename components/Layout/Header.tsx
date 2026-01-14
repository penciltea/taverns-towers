'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Box,
  useTheme,
  Stack,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@/lib/util/stringFormats';
import { userTier } from '@/constants/user.options';
import UserAvatar from '../Common/UserAvatar';

export default function Header() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = useUIStore((state) => state.toggleDrawer);
  const anchorEl = useUIStore(state => state.userMenuAnchor);
  const setAnchorEl = useUIStore(state => state.setUserMenuAnchor);
  const closeUserMenu = useUIStore(state => state.closeUserMenu);

  const user = useAuthStore((state) => state.user);

  const displayName = user?.username || "Traveler";
  const displayTier = capitalizeFirstLetter(user?.tier ?? userTier[0]);

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

  const headerTextColor =
    theme.palette.mode === "light" ? "#1d2a3b" : "inherit";

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      {/* === TOP ROW (always horizontal) === */}
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, color: headerTextColor }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ color: headerTextColor }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            RealmFoundry
          </Link>
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop-only actions */}
        {!isMobile && (
          <>
            {user ? (
              <>
                <Button
                  color="inherit"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <UserAvatar
                    username={user.username}
                    avatar={user.avatar ?? ""}
                    width={26}
                    height={26}
                  />
                  Hi, {displayName}!
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={closeUserMenu}
                >
                  <MenuItem disabled>Tier: {displayTier}</MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleNavigate('/account/dashboard')}>
                    Account Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  sx={{ color: headerTextColor }}
                  onClick={() => handleNavigate('/auth/login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleNavigate('/auth/register')}
                >
                  Register
                </Button>
              </Stack>
            )}
          </>
        )}
      </Toolbar>

      {/* === MOBILE STACKED ACTIONS === */}
      {isMobile && !user && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Stack spacing={1}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => handleNavigate('/auth/login')}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => handleNavigate('/auth/register')}
            >
              Register
            </Button>
          </Stack>
        </Box>
      )}
    </AppBar>
  );
}