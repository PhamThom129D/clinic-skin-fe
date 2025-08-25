"use client";

import { Box, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";

const offers = [
  { title: "Giảm 50% Nâng mũi", desc: "Tạo dáng mũi chuẩn Hàn Quốc", img: "/offer1.jpg" },
  { title: "Ưu đãi Cắt mí", desc: "Đôi mắt to tròn, tự nhiên", img: "/offer2.jpg" },
  { title: "Trị nám - trẻ hóa", desc: "Công nghệ Laser hiện đại", img: "/offer3.jpg" },
  { title: "Combo dưỡng da", desc: "Chăm sóc chuyên sâu", img: "/offer4.jpg" },
  { title: "Khuyến mãi triệt lông", desc: "Hiệu quả lâu dài", img: "/offer5.jpg" },
  { title: "Giảm béo công nghệ cao", desc: "An toàn, không xâm lấn", img: "/offer6.jpg" },
];

export default function Offers() {
  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        Ưu Đãi Hot
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        }}
      >
        {offers.map((offer, i) => (
          <Card
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              transition: "0.3s",
              "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
            }}
            elevation={3}
          >
            {/* Ảnh */}
            <CardMedia
              component="img"
              height="180"
              image={offer.img}
              alt={offer.title}
            />

            {/* Nội dung */}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom color="primary">
                {offer.title}
              </Typography>
              <Typography color="text.secondary">{offer.desc}</Typography>
            </CardContent>

            {/* Nút cố định cuối */}
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Button variant="contained" color="primary">
                Tìm hiểu thêm
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
