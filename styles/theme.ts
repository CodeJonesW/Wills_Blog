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
      primary: "#F6FCDF",
      secondary: "#859F3D",
    },
  },
  typography: {
    h4: {
      fontSize: "1rem",
      letterSpacing: "0.14em",
      fontFamily: "Merriweather",
    },
    h3: {
      fontSize: "1.5rem",
      letterSpacing: "0.14em",
      fontFamily: "Merriweather",
    },
    h2: {
      fontSize: "2rem",
      letterSpacing: "0.14em",
      fontFamily: "Merriweather",
    },
    h1: {
      fontSize: "2.5rem",
      letterSpacing: "0.14em",
      fontFamily: "Merriweather",
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
