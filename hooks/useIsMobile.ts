import { useTheme, useMediaQuery } from '@mui/material';

// Determines whether the viewport is a mobile-sized viewport

export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};