"use client"; 
import { Box, Typography } from "@mui/material";
import Header from "@/components/patient/dashboard/layout/Header";
import Footer from "@/components/patient/dashboard/layout/Footer";
import ChatBox from "@/components/patient/dashboard/boxchat/ChatBox";
import Sidebar from "@/components/patient/personal/account/layout/Sidebar";
import { useTheme } from "@mui/material/styles";
import { AccountProvider } from "@/context/AccountContext";
import { useUser } from "@/hooks/useUser";

export default function PatientInfoLayout({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const account = useUser().account;

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url("https://res.cloudinary.com/dgmrwe4eo/image/upload/v1756106511/test_Bg_naaz2k.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {isDark && (
        <Box sx={{ position: "absolute", inset: 0, backgroundColor: "rgba(40, 99, 57, 0.5)", pointerEvents: "none", }} />
      )}
        <Header />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxWidth: '1200px', mx: 'auto', gap: 3}}>
            <Box sx={{ flexShrink: 0, width: { xs: '100%', md: '300px' } }}>
                <Sidebar />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                {!account ? (
                    <Typography align="center">
                    Bạn chưa đăng nhập. Vui lòng đăng nhập để truy cập trang này.
                    </Typography>
                ) : (
                    children
                )}
            </Box>
        </Box>
        <Footer />
        <ChatBox />
    </Box>
  );
}