import AvatarCard from "@/components/common/AvatarCard";
import SectionTitle from "@/components/common/SectionTitle";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Testimonial } from "@/types/screen";
import { fetchTestimonials } from "@/services/screenService";

// const testimonials = [
//   { name: "Khách hàng 1", text: "Dịch vụ tuyệt vời, tôi rất hài lòng!", img: "/images/customer1.jpg" },
//   { name: "Khách hàng 2", text: "Bác sĩ tận tâm, kết quả ngoài mong đợi.", img: "/images/customer2.jpg" },
//   { name: "Khách hàng 3", text: "Không gian sang trọng, cảm giác thoải mái.", img: "/images/customer3.jpg" },
// ];
const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
  <Box sx={{ py: 16, px: { xs: 2, sm: 4, md: 16 } }}>
    <SectionTitle>Khách Hàng Nói Gì?</SectionTitle>
    <Box sx={{ mt: 4, display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" } }}>
      {testimonials.map((t, i) => (
        <AvatarCard key={i} name={t.fullName} text={t.content} img={t.img} />
      ))}
    </Box>
  </Box>
);
};

export default Testimonials;
