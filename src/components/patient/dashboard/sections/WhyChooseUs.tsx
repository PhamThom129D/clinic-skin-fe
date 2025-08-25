import { Box, Typography } from "@mui/material";
import React from "react";
import { WorkspacePremium, MedicalServices, Favorite } from "@mui/icons-material";
import CardHover from "@/components/common/CardHover";

const reasons = [
  { title: "Kinh nghiệm lâu năm", text: "Đội ngũ bác sĩ với nhiều năm kinh nghiệm.", icon: <WorkspacePremium sx={{ fontSize: 50, color: "#FFD700" }} /> },
  { title: "Trang thiết bị hiện đại", text: "Ứng dụng công nghệ tiên tiến hàng đầu.", icon: <MedicalServices sx={{ fontSize: 50, color: "#4caf50" }} /> },
  { title: "Dịch vụ tận tâm", text: "Chăm sóc khách hàng chu đáo, chuyên nghiệp.", icon: <Favorite sx={{ fontSize: 50, color: "#f06292" }} /> },
];

const WhyChooseUs: React.FC = () => (
  <Box sx={{ py: 16, px: { xs: 2, sm: 4, md: 16 } }}>
    <Box sx={{ textAlign: "center", mb: 8, fontSize: "2rem", fontWeight: "bold" }}>Vì Sao Chọn Chúng Tôi?</Box>

    <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" } }}>
      {reasons.map((r, i) => (
        <CardHover key={i}>
          <Box sx={{ mb: 2 }}>{r.icon}</Box>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>{r.title}</Typography>
          <Typography variant="body2" color="text.secondary">{r.text}</Typography>
        </CardHover>
      ))}
    </Box>
  </Box>
);

export default WhyChooseUs;
