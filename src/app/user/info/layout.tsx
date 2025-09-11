"use client";
import { AccountProvider } from "@/context/AccountContext";
import Header from "@/components/patient/dashboard/layout/Header";
import Footer from "@/components/patient/dashboard/layout/Footer";
import ChatBox from "@/components/patient/dashboard/boxchat/ChatBox";
import Sidebar from "@/components/patient/info/section/Sidebar";
import { Box } from "@mui/material";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider>
      <main>
        {/* Banner + Header */}
        <Box id="banner">
          <Header />
        </Box>

        {/* Layout 2 cột: Sidebar + Nội dung */}
        <Box
          sx={{
            position: "relative",
            backgroundImage: `url("https://res.cloudinary.com/dgmrwe4eo/image/upload/v1756106511/test_Bg_naaz2k.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            py: 4,
            px: { xs: 2, sm: 4, md: 8 },
            display: "flex",
            gap: "30px",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          {/* Sidebar */}
          <Box sx={{ flexShrink: 0, width: { xs: "100%", md: "300px" } }}>
            <Sidebar />
          </Box>

          {/* Nội dung chính */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>{children}</Box>
        </Box>

        <Footer />
        <ChatBox />
      </main>
    </AccountProvider>
  );
}
