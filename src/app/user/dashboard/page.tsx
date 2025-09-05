

import Footer from "@/components/patient/dashboard/layout/Footer";
import { Box } from "@mui/material";
import ChatBox from "@/components/patient/dashboard/boxchat/ChatBox";
import Content from "@/components/patient/dashboard/layout/Content";
import Banner from "@/components/patient/dashboard/layout/Banner";
import Header from "@/components/patient/dashboard/layout/Header";


export default function Page() {
  return (
    <main>
      <Box id="banner">
        <Header />
        <Banner />
      </Box>

      <Content />
      <Footer />
      <ChatBox />
    </main>
  );
}

