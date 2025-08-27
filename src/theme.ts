import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#64ce82ff",       // xanh pastel nhẹ
      dark: "#52c0d3ff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ee9f37ff",       
      contrastText: "#242222",
    },
    text: {
      primary: "#2e2e2eff",
      secondary: "#475547ff",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64ce82ff",
      dark: "#52c0d3ff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ee9f37ff",
      contrastText: "#f5f5f5",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#cfd8dc",
    },
    background: {
      default: "#121212",   // nền tối
      paper: "#1e1e1e",     // card/section tối
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});
