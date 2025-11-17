import { Box, Typography } from "@mui/material";
import React from "react";
import { WorkspacePremium, MedicalServices, Favorite } from "@mui/icons-material";
import CardHover from "../../../../../common/CardHover";
import StarIcon from "@mui/icons-material/Star";

const reasons = [
  { 
    title: "Bác sĩ giàu kinh nghiệm", 
    text: "Đội ngũ chuyên gia da liễu hàng đầu, nhiều năm điều trị thành công.", 
    icon: <WorkspacePremium sx={{ fontSize: 50, color: "#fbc02d" }} /> 
  },
  { 
    title: "Công nghệ tiên tiến", 
    text: "Trang thiết bị hiện đại, cập nhật công nghệ thẩm mỹ mới nhất.", 
    icon: <MedicalServices sx={{ fontSize: 50, color: "#43a047" }} /> 
  },
  { 
    title: "Dịch vụ 5★ tận tâm", 
    text: "Khách hàng được chăm sóc chu đáo, hỗ trợ 24/7 với sự chuyên nghiệp.", 
    icon: <Favorite sx={{ fontSize: 50, color: "#e53935" }} /> 
  },
];

const WhyChooseUs: React.FC = () => (
  <Box sx={{ py: 12, px: { xs: 2, sm: 4, md: 16 } }}>
    <Box sx={{ textAlign: "center", mb: 8 }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          background: "linear-gradient(90deg, #158437, #52b788)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Vì Sao Chọn Chúng Tôi?
        <StarIcon sx={{ fontSize: 50, color: "#158437" }} />
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mt: 1, fontStyle: "italic" }}
      >
        Cam kết dịch vụ chuẩn 5★ – Uy tín, chất lượng và tận tâm
      </Typography>
    </Box>

    <Box
      sx={{
        display: "grid",
        gap: 4,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
        },
      }}
    >
      {reasons.map((r, i) => (
<CardHover
  key={i}
  sx={{
    backgroundColor: "#e9fff5ff", // nền trắng pha xanh
    border: "1px solid #cce9dd", // viền mint pastel
    borderRadius: 3,
    p: 3,
    textAlign: "center",
    transition: "all 0.35s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #b8f7d6ff, #ffffff)", // hover gradient nhạt
      borderColor: "#52b788", // viền xanh nhạt chủ đạo
      transform: "translateY(-8px)",
      boxShadow: "0 8px 24px rgba(21,132,55,0.2)", // bóng xanh đậm hơn
    },
  }}
>
  <Box sx={{ mb: 2 }}>{r.icon}</Box>
  <Typography variant="h6" color="primary" sx={{ mb: 1, fontWeight: "bold" }}>
    {r.title}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    {r.text}
  </Typography>
</CardHover>


      ))}
    </Box>
  </Box>
);

export default WhyChooseUs;
