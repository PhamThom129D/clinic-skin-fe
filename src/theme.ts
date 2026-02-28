import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#64ce82",       // Xanh mint tươi mát, phù hợp với y tế
      light: "#8ee4a4",      // Xanh sáng hơn
      dark: "#4caf50",       // Xanh đậm hơn
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff7043",       // Cam ấm áp, tạo điểm nhấn
      light: "#ff9a76",      
      dark: "#e64a19",       
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ffc107",
      light: "#ffecb3",
      dark: "#f57c00",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    text: {
      primary: "#2c3e50",     // Xanh đậm cho text chính
      secondary: "#5a6c7d",   // Xanh nhạt cho text phụ
    },
    background: {
      default: "#fafafa",     // Nền trắng nhẹ
      paper: "#ffffff",       // Nền card trắng tinh
    },
    divider: "rgba(100, 206, 130, 0.12)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: "3rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(100, 206, 130, 0.08)",
    "0px 4px 8px rgba(100, 206, 130, 0.12)",
    "0px 8px 16px rgba(100, 206, 130, 0.16)",
    "0px 12px 24px rgba(100, 206, 130, 0.20)",
    "0px 16px 32px rgba(100, 206, 130, 0.24)",
    "0px 2px 4px -1px rgba(100, 206, 130, 0.2), 0px 4px 5px 0px rgba(100, 206, 130, 0.14), 0px 1px 10px 0px rgba(100, 206, 130, 0.12)",
    "0px 3px 5px -1px rgba(100, 206, 130, 0.2), 0px 5px 8px 0px rgba(100, 206, 130, 0.14), 0px 1px 14px 0px rgba(100, 206, 130, 0.12)",
    "0px 5px 5px -3px rgba(100, 206, 130, 0.2), 0px 8px 10px 1px rgba(100, 206, 130, 0.14), 0px 3px 14px 2px rgba(100, 206, 130, 0.12)",
    "0px 5px 6px -3px rgba(100, 206, 130, 0.2), 0px 9px 12px 1px rgba(100, 206, 130, 0.14), 0px 3px 16px 2px rgba(100, 206, 130, 0.12)",
    "0px 6px 6px -3px rgba(100, 206, 130, 0.2), 0px 10px 14px 1px rgba(100, 206, 130, 0.14), 0px 4px 18px 3px rgba(100, 206, 130, 0.12)",
    "0px 6px 7px -4px rgba(100, 206, 130, 0.2), 0px 11px 15px 1px rgba(100, 206, 130, 0.14), 0px 4px 20px 3px rgba(100, 206, 130, 0.12)",
    "0px 7px 8px -4px rgba(100, 206, 130, 0.2), 0px 12px 17px 2px rgba(100, 206, 130, 0.14), 0px 5px 22px 4px rgba(100, 206, 130, 0.12)",
    "0px 7px 8px -4px rgba(100, 206, 130, 0.2), 0px 13px 19px 2px rgba(100, 206, 130, 0.14), 0px 5px 24px 4px rgba(100, 206, 130, 0.12)",
    "0px 7px 9px -4px rgba(100, 206, 130, 0.2), 0px 14px 21px 2px rgba(100, 206, 130, 0.14), 0px 5px 26px 4px rgba(100, 206, 130, 0.12)",
    "0px 8px 9px -5px rgba(100, 206, 130, 0.2), 0px 15px 22px 2px rgba(100, 206, 130, 0.14), 0px 6px 28px 5px rgba(100, 206, 130, 0.12)",
    "0px 8px 10px -5px rgba(100, 206, 130, 0.2), 0px 16px 24px 2px rgba(100, 206, 130, 0.14), 0px 6px 30px 5px rgba(100, 206, 130, 0.12)",
    "0px 8px 11px -5px rgba(100, 206, 130, 0.2), 0px 17px 26px 2px rgba(100, 206, 130, 0.14), 0px 6px 32px 5px rgba(100, 206, 130, 0.12)",
    "0px 9px 11px -5px rgba(100, 206, 130, 0.2), 0px 18px 28px 2px rgba(100, 206, 130, 0.14), 0px 7px 34px 6px rgba(100, 206, 130, 0.12)",
    "0px 9px 12px -6px rgba(100, 206, 130, 0.2), 0px 19px 29px 2px rgba(100, 206, 130, 0.14), 0px 7px 36px 6px rgba(100, 206, 130, 0.12)",
    "0px 10px 13px -6px rgba(100, 206, 130, 0.2), 0px 20px 31px 3px rgba(100, 206, 130, 0.14), 0px 8px 38px 7px rgba(100, 206, 130, 0.12)",
    "0px 10px 13px -6px rgba(100, 206, 130, 0.2), 0px 21px 33px 3px rgba(100, 206, 130, 0.14), 0px 8px 40px 7px rgba(100, 206, 130, 0.12)",
    "0px 10px 14px -6px rgba(100, 206, 130, 0.2), 0px 22px 35px 3px rgba(100, 206, 130, 0.14), 0px 8px 42px 7px rgba(100, 206, 130, 0.12)",
    "0px 11px 14px -7px rgba(100, 206, 130, 0.2), 0px 23px 36px 3px rgba(100, 206, 130, 0.14), 0px 9px 44px 8px rgba(100, 206, 130, 0.12)",
    "0px 11px 15px -7px rgba(100, 206, 130, 0.2), 0px 24px 38px 3px rgba(100, 206, 130, 0.14), 0px 9px 46px 8px rgba(100, 206, 130, 0.12)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600,
          padding: "12px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(100, 206, 130, 0.3)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #64ce82 0%, #4caf50 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
            boxShadow: "0px 6px 20px rgba(100, 206, 130, 0.4)",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
            background: "rgba(100, 206, 130, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(100, 206, 130, 0.08)",
          border: "1px solid rgba(100, 206, 130, 0.08)",
          "&:hover": {
            boxShadow: "0px 8px 30px rgba(100, 206, 130, 0.15)",
            transform: "translateY(-4px)",
          },
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(100, 206, 130, 0.08)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#64ce82",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#64ce82",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          background: "linear-gradient(135deg, #64ce82, #4caf50)",
          color: "#ffffff",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64ce82",
      light: "#8ee4a4",
      dark: "#4caf50", 
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff7043",
      light: "#ff9a76",
      dark: "#e64a19",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
      light: "#e57373", 
      dark: "#d32f2f",
    },
    warning: {
      main: "#ffc107",
      light: "#ffecb3",
      dark: "#f57c00",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#b0bec5",
    },
    background: {
      default: "#0a0a0a",     // Nền tối đẹp
      paper: "#1a1a1a",       // Card tối
    },
    divider: "rgba(100, 206, 130, 0.2)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: "3rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem", 
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem", 
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.3)",
    "0px 4px 8px rgba(0, 0, 0, 0.4)",
    "0px 8px 16px rgba(0, 0, 0, 0.5)",
    "0px 12px 24px rgba(0, 0, 0, 0.6)",
    "0px 16px 32px rgba(0, 0, 0, 0.7)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.5), 0px 4px 5px 0px rgba(0, 0, 0, 0.3), 0px 1px 10px 0px rgba(0, 0, 0, 0.2)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.5), 0px 5px 8px 0px rgba(0, 0, 0, 0.3), 0px 1px 14px 0px rgba(0, 0, 0, 0.2)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.5), 0px 8px 10px 1px rgba(0, 0, 0, 0.3), 0px 3px 14px 2px rgba(0, 0, 0, 0.2)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.5), 0px 9px 12px 1px rgba(0, 0, 0, 0.3), 0px 3px 16px 2px rgba(0, 0, 0, 0.2)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.5), 0px 10px 14px 1px rgba(0, 0, 0, 0.3), 0px 4px 18px 3px rgba(0, 0, 0, 0.2)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.5), 0px 11px 15px 1px rgba(0, 0, 0, 0.3), 0px 4px 20px 3px rgba(0, 0, 0, 0.2)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.5), 0px 12px 17px 2px rgba(0, 0, 0, 0.3), 0px 5px 22px 4px rgba(0, 0, 0, 0.2)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.5), 0px 13px 19px 2px rgba(0, 0, 0, 0.3), 0px 5px 24px 4px rgba(0, 0, 0, 0.2)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.5), 0px 14px 21px 2px rgba(0, 0, 0, 0.3), 0px 5px 26px 4px rgba(0, 0, 0, 0.2)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.5), 0px 15px 22px 2px rgba(0, 0, 0, 0.3), 0px 6px 28px 5px rgba(0, 0, 0, 0.2)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.5), 0px 16px 24px 2px rgba(0, 0, 0, 0.3), 0px 6px 30px 5px rgba(0, 0, 0, 0.2)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.5), 0px 17px 26px 2px rgba(0, 0, 0, 0.3), 0px 6px 32px 5px rgba(0, 0, 0, 0.2)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.5), 0px 18px 28px 2px rgba(0, 0, 0, 0.3), 0px 7px 34px 6px rgba(0, 0, 0, 0.2)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.5), 0px 19px 29px 2px rgba(0, 0, 0, 0.3), 0px 7px 36px 6px rgba(0, 0, 0, 0.2)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.5), 0px 20px 31px 3px rgba(0, 0, 0, 0.3), 0px 8px 38px 7px rgba(0, 0, 0, 0.2)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.5), 0px 21px 33px 3px rgba(0, 0, 0, 0.3), 0px 8px 40px 7px rgba(0, 0, 0, 0.2)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.5), 0px 22px 35px 3px rgba(0, 0, 0, 0.3), 0px 8px 42px 7px rgba(0, 0, 0, 0.2)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.5), 0px 23px 36px 3px rgba(0, 0, 0, 0.3), 0px 9px 44px 8px rgba(0, 0, 0, 0.2)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.5), 0px 24px 38px 3px rgba(0, 0, 0, 0.3), 0px 9px 46px 8px rgba(0, 0, 0, 0.2)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600,
          padding: "12px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(100, 206, 130, 0.3)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #64ce82 0%, #4caf50 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
            boxShadow: "0px 6px 20px rgba(100, 206, 130, 0.4)",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
            background: "rgba(100, 206, 130, 0.08)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(100, 206, 130, 0.1)",
          backgroundColor: "#1a1a1a",
          "&:hover": {
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.5)",
            transform: "translateY(-4px)",
          },
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(26, 26, 26, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(100, 206, 130, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#64ce82",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#64ce82", 
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          background: "linear-gradient(135deg, #64ce82, #4caf50)",
          color: "#ffffff",
        },
      },
    },
  },
});
