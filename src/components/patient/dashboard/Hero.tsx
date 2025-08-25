import { Box, Container, Typography } from "@mui/material";
import React from "react";
import ButtonPrimary from "../../common/ButtonPrimary";

const Hero: React.FC = () => (
<Box
  sx={{
    height: "110vh",
    backgroundImage: "url('https://thucucsaigon.vn/m/intro/Banner-web-1920x970tv.jpg')",
    backgroundSize: "cover", // ảnh phủ toàn bộ box, giữ tỉ lệ
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat", // tránh lặp ảnh
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  }}
>

    {/* <Container sx={{ position: "relative", zIndex: 1 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Thẩm Mỹ Thu Cúc
      </Typography>
      <Typography variant="h6" gutterBottom>
        Nơi sắc đẹp được nâng tầm đẳng cấp ✨
      </Typography>
      <ButtonPrimary href="#booking">Đặt lịch ngay</ButtonPrimary>
    </Container> */}
  </Box>
);

export default Hero;
