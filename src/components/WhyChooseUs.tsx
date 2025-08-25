"use client";

import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const reasons = [
  { 
    title: "Kinh nghiệm lâu năm", 
    text: "Đội ngũ bác sĩ với nhiều năm kinh nghiệm.", 
    img: "/images/reason1.jpg" 
  },
  { 
    title: "Trang thiết bị hiện đại", 
    text: "Ứng dụng công nghệ tiên tiến hàng đầu.", 
    img: "/images/reason2.jpg" 
  },
  { 
    title: "Dịch vụ tận tâm", 
    text: "Chăm sóc khách hàng chu đáo, chuyên nghiệp.", 
    img: "/images/reason3.jpg" 
  },
];

export default function Reasons() {
  return (
    <Box sx={{ py: 16 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Vì Sao Chọn Chúng Tôi?
      </Typography>
      <Box
        sx={{
          mt: 4,
          px: 2,
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(3, 1fr)", // luôn 3 cột
        }}
      >
        {reasons.map((r, i) => (
          <Card
            key={i}
            sx={{
              p: 3,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
            elevation={3}
          >
            {/* Ảnh phía trên */}
            <CardMedia
              component="img"
              image={r.img}
              alt={r.title}
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                mx: "auto",
                mt: 2,
              }}
            />
            <CardContent>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                sx={{ mt: 2 }}
              >
                {r.title}
              </Typography>
              <Typography color="text.secondary">
                {r.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
