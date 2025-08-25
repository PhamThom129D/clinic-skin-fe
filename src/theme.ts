import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63",
      dark: "#ad1457",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00bcd4",
    },
    text: {
      primary: "#333333",
    },
  },
});

export default theme;
