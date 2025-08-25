"use client";

import { Box, Typography, Card, Avatar } from "@mui/material";

const doctors = [
  { name: "BS. Nguyễn Văn A", role: "Chuyên gia thẩm mỹ", img: "/doctor1.jpg" },
  { name: "BS. Trần Thị B", role: "Chuyên gia da liễu", img: "/doctor2.jpg" },
  { name: "BS. Lê Văn C", role: "Phẫu thuật thẩm mỹ", img: "/doctor3.jpg" },
  { name: "BS. Phạm Thị D", role: "Chăm sóc da", img: "/doctor4.jpg" },
];

export default function DoctorTeam() {
  return (
    <Box sx={{ py: 16 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Đội Ngũ Bác Sĩ
      </Typography>

      <Box
        sx={{
          mt: 4,
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
        }}
      >
        {doctors.map((doc, i) => (
          <Card
            key={i}
            sx={{
              textAlign: "center",
              p: 2,
              transition: "0.3s",
              "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
            }}
            elevation={3}
          >
            <Avatar
              src={doc.img}
              alt={doc.name}
              sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6">{doc.name}</Typography>
            <Typography color="text.secondary">{doc.role}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
