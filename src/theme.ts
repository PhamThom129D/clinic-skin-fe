import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#bf817f",
      dark: "#483932",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e4baa7",
      contrastText: "#151413",
    },
    text: {
      primary: "#151413",
      secondary: "#483932",
    },
    background: {
      default: "transparent", // fallback màu nhạt nếu ảnh chưa load
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

// // Áp dụng ảnh nền toàn trang bằng CSS
// const globalStyles = {
//   body: {
//     backgroundImage: `url("https://res.cloudinary.com/dgmrwe4eo/image/upload/v1756106511/test_Bg_naaz2k.jpg")`,
//     backgroundSize: "cover",
//     backgroundPosition: "top center", // ưu tiên hiển thị phần trên
//     backgroundRepeat: "no-repeat",
//     backgroundAttachment: "fixed",
//   },
// };


export { theme};
