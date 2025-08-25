import { Box } from "@mui/material";
import React from "react";
import SectionTitle from "../../common/SectionTitle";
import CardHover from "../../common/CardHover";

const reasons = [
  { title: "Kinh nghiệm lâu năm", text: "Đội ngũ bác sĩ với nhiều năm kinh nghiệm.", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { title: "Trang thiết bị hiện đại", text: "Ứng dụng công nghệ tiên tiến hàng đầu.", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { title: "Dịch vụ tận tâm", text: "Chăm sóc khách hàng chu đáo, chuyên nghiệp.", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
];

const WhyChooseUs: React.FC = () => (
  <Box sx={{ py: 16 }}>
    <SectionTitle>Vì Sao Chọn Chúng Tôi?</SectionTitle>
    <Box
      sx={{
        mt: 4,
        px: { xs: 2, sm: 4, md: 16 },
        display: "grid",
        gap: { xs: 4, sm: 6 },
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" },
      }}
    >
      {reasons.map((r, i) => (
        <CardHover key={i} image={r.img}>
          <Box sx={{ mt: 2 }}>
            <Box component="h3" sx={{ color: "primary.main", mb: 1 }}>
              {r.title}
            </Box>
            <Box sx={{ color: "text.secondary" }}>{r.text}</Box>
          </Box>
        </CardHover>
      ))}
    </Box>
  </Box>
);

export default WhyChooseUs;
