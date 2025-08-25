'use client';
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import Image from "next/image";

export default function Menu() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* AppBar cố định với màu xanh đậm */}
      <AppBar position="fixed" sx={{ backgroundColor: "#027d44" }} elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
            {/* Logo góc trái */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: 50 }}>
            <Image
              src="/images/logoT.jpg"
              alt="Logo"
              height={50}   // chiều cao cố định
              width={50 * 2.4} // width = height * tỉ lệ gốc (nếu logo gốc 120x50)
              style={{ objectFit: "contain" }} // giữ tỉ lệ, không méo
            />
          </Box>


          {/* Menu button với chữ to */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              color="inherit"
              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              onClick={() => handleScroll("hero")}
            >
              Trang Chủ
            </Button>
            <Button color="inherit" sx={{ fontSize: "1.2rem", fontWeight: "bold" }} onClick={() => handleScroll("offers")}>
              Ưu Đãi
            </Button>
            <Button color="inherit" sx={{ fontSize: "1.2rem", fontWeight: "bold" }} onClick={() => handleScroll("doctor-team")}>
              Đội Ngũ Bác Sĩ
            </Button>
            <Button color="inherit" sx={{ fontSize: "1.2rem", fontWeight: "bold" }} onClick={() => handleScroll("why-choose-us")}>
              Tại Sao Chọn Chúng Tôi
            </Button>
            <Button color="inherit" sx={{ fontSize: "1.2rem", fontWeight: "bold" }} onClick={() => handleScroll("testimonials")}>
              Lời Nhận Xét
            </Button>
            <Button color="inherit" sx={{ fontSize: "1.2rem", fontWeight: "bold" }} onClick={() => handleScroll("contact-booking")}>
              Liên Hệ & Đặt Lịch
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer để tránh che nội dung */}
      <Toolbar />
    </>
  );
}
