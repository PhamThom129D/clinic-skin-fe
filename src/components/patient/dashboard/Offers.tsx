import { Box } from "@mui/material";
import React from "react";
import SectionTitle from "../../common/SectionTitle";
import CardHover from "../../common/CardHover";
import ButtonPrimary from "../../common/ButtonPrimary";

const offers = [
  { title: "Giảm 50% Nâng mũi", desc: "Tạo dáng mũi chuẩn Hàn Quốc", img: "https://i.pinimg.com/736x/0e/cf/07/0ecf07040c7806a0b017331a5d75d661.jpg" },
  { title: "Ưu đãi Cắt mí", desc: "Đôi mắt to tròn, tự nhiên", img: "https://i.pinimg.com/736x/5f/76/46/5f7646bf405c0f585b60bd97b0080162.jpg" },
  { title: "Trị nám - trẻ hóa", desc: "Công nghệ Laser hiện đại", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { title: "Combo dưỡng da", desc: "Chăm sóc chuyên sâu", img: "https://i.pinimg.com/736x/bb/46/3f/bb463f961c29cb926d01b1a4f3a2ca0d.jpg" },
  { title: "Khuyến mãi triệt lông", desc: "Hiệu quả lâu dài", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { title: "Giảm béo công nghệ cao", desc: "An toàn, không xâm lấn", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
];

const Offers: React.FC = () => (
  <Box sx={{ py: 8 }}>
    <SectionTitle>Ưu Đãi Hot</SectionTitle>
    <Box
      sx={{
        mt: 4,
        px: { xs: 2, sm: 6, md: 20 },
        display: "grid",
        gap : 4,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
      }}
    >
 {offers.map((offer, i) => (
  <CardHover
    key={i}
    image={offer.img}
    imageWidth="100%"
    imageHeight={250}
    objectFit="contain"
  >
    <Box sx={{ mb: 2 }}>
      <Box component="h3" sx={{ color: "primary.main", mb: 1 }}>
        {offer.title}
      </Box>
      <Box sx={{ color: "text.secondary" }}>{offer.desc}</Box>
    </Box>
    <ButtonPrimary size="small">Tìm hiểu thêm</ButtonPrimary>
  </CardHover>
))}
    </Box>
  </Box>
);

export default Offers;
