import { createTheme } from "@mui/material";

// Shared brand colors
const parchment = "#faf3e0";   // parchment base
const ivory = "#f8f4e9";       // ivory surface
const teal = "#00b7c2";        // teal accent
const purple = "#6a2ce0";       // purple accent
const purpleDarkMode = "#b18cff"; // softer, less intense
const darkSlate = "#1d2a3b";   // dark slate (used for dark bg + text)
const mutedGrayBlue = "#4b5a6a"; // cool muted text
const amber = "#E0A82E";       // warning accent
const errorDark = "#B3261E";
const errorLight = "#F28B82";

export const lightTheme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.info.main,
          "&:hover": { color: theme.palette.info.dark },
          "&:visited": { color: theme.palette.info.light },
        }),
      },
    },
  },
  palette: {
    mode: "light",
    background: {
      default: parchment,
      paper: ivory,
    },
    primary: { main: teal, contrastText: "#fff" },
    secondary: { main: purple, contrastText: "#fff" },
    text: { primary: darkSlate, secondary: mutedGrayBlue },
    info: { main: teal },
    warning: { main: amber },
    success: { main: purple },
    error: { main: errorDark },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
});

export const darkTheme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.info.main,
          "&:hover": { color: theme.palette.info.dark },
          "&:visited": { color: theme.palette.info.light },
        }),
      },
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: darkSlate,
      paper: "#2B2B3F", // a slightly lighter dark surface
    },
    primary: { main: teal, contrastText: "#fff" },
    secondary: { main: purpleDarkMode, contrastText: "#fff" },
    text: { primary: parchment, secondary: ivory },
    info: { main: teal },
    warning: { main: amber },
    success: { main: purpleDarkMode },
    error: { main: errorLight },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
});
