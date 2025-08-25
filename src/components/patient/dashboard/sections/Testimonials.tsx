import AvatarCard from "@/components/common/AvatarCard";
import SectionTitle from "@/components/common/SectionTitle";
import { Box } from "@mui/material";
import React from "react";

const testimonials = [
  { name: "Khách hàng 1", text: "Dịch vụ tuyệt vời, tôi rất hài lòng!", img: "/images/customer1.jpg" },
  { name: "Khách hàng 2", text: "Bác sĩ tận tâm, kết quả ngoài mong đợi.", img: "/images/customer2.jpg" },
  { name: "Khách hàng 3", text: "Không gian sang trọng, cảm giác thoải mái.", img: "/images/customer3.jpg" },
];

const Testimonials: React.FC = () => (
  <Box sx={{ py: 16, px: { xs: 2, sm: 4, md: 16 } }}>
    <SectionTitle>Khách Hàng Nói Gì?</SectionTitle>
    <Box sx={{ mt: 4, display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" } }}>
      {testimonials.map((t, i) => (
        <AvatarCard key={i} name={t.name} text={t.text} img={t.img} />
      ))}
    </Box>
  </Box>
);

export default Testimonials;
