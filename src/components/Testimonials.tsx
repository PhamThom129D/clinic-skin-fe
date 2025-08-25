"use client";

import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";

const testimonials = [
  { 
    name: "Khách hàng 1", 
    text: "Dịch vụ tuyệt vời, tôi rất hài lòng!", 
    img: "/images/customer1.jpg" 
  },
  { 
    name: "Khách hàng 2", 
    text: "Bác sĩ tận tâm, kết quả ngoài mong đợi.", 
    img: "/images/customer2.jpg" 
  },
  { 
    name: "Khách hàng 3", 
    text: "Không gian sang trọng, cảm giác thoải mái.", 
    img: "/images/customer3.jpg" 
  },
];

export default function Testimonials() {
  return (
    <Box sx={{ py: 16 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Khách Hàng Nói Gì?
      </Typography>
      <Box
        sx={{
          mt: 4,
          px: 2,
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        }}
      >
        {testimonials.map((t, i) => (
          <Card
            key={i}
            sx={{
              p: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
            elevation={3}
          >
            <CardContent sx={{ textAlign: "center" }}>
              {/* Nội dung review */}
              <Typography
                color="text.secondary"
                fontStyle="italic"
                gutterBottom
              >
                “{t.text}”
              </Typography>

              {/* Avatar + Tên nằm ngang */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Avatar
                  src={t.img}
                  alt={t.name}
                  sx={{ width: 50, height: 50 }}
                />
                <Typography variant="subtitle1" color="primary" fontWeight="bold">
                  {t.name}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
