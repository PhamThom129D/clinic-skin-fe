

import Footer from "@/components/patient/dashboard/layout/Footer";
import { Box } from "@mui/material";
import ChatBox from "@/components/patient/dashboard/boxchat/ChatBox";
import Content from "@/components/patient/info/section/Content";
import Header from "@/components/patient/dashboard/layout/Header";


export default function Page() {
  return (
    <main>
      <Box id="banner">
        <Header />
      </Box>

      <Content />
      <Footer />
      <ChatBox />
    </main>
  );
}

