import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1A1A19",
    },
    secondary: {
      main: "#31511E",
    },
    background: {
      default: "#1A1A19",
      paper: "#31511E",
    },
    text: {
      primary: "#859F3D",
      secondary: "#F6FCDF",
    },
  },
  typography: {
    fontFamily: "Merriweather",
    h4: {
      fontSize: "1rem",
      letterSpacing: "0.14em",
    },
    h3: {
      fontSize: "1.5rem",
      letterSpacing: "0.14em",
    },
    body1: {
      fontFamily: "Open Sans",
    },
    body2: {
      fontFamily: "Open Sans",
      fontStyle: "italic",
    },
  },
});
