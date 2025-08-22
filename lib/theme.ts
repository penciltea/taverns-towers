import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#5A4FCF' },
    secondary: { main: '#1e1e2e' },
    background: { default: '#fdf6e3' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#5A4FCF' },
    secondary: { main: '#1e1e2e' },
    background: { default: '#121212' },
  },
});