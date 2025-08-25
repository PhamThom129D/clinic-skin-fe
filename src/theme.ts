import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a0c4aaff",       // xanh pastel nhẹ, dùng cho nút, links chính
      dark: "#6b8e6fff",       // xanh đậm hơn, hover/active
      contrastText: "#ffffff", // chữ trắng nổi bật trên primary
    },
    secondary: {
      main: "#f4d6b0ff",       // vàng nhạt – dùng cho accent, highlight
      contrastText: "#242222", // chữ tối trên background sáng
    },
    text: {
      primary: "#2e2e2eff",   // xám đậm, dễ đọc
      secondary: "#475547ff", // xám xanh nhạt cho text phụ
    },
    background: {
      default: "#f9f9f9",     // nền tổng thể sáng, nhẹ nhàng
      paper: "#ffffff",        // nền card / section
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

export { theme };
