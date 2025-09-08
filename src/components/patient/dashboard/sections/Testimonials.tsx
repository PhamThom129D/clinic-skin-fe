import AvatarCard from "@/components/common/AvatarCard";
import SectionTitle from "@/components/common/SectionTitle";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Testimonial } from "@/types/screen";
import { getTestimonials } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";

const Testimonials: React.FC = () => {
  const { data: testimonials, isLoading } = useFetchData<Testimonial[]>(getTestimonials);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!testimonials || testimonials.length === 0) {
    return <Typography></Typography>;
  }

  return (
    <Box sx={{ py: 16, px: { xs: 2, sm: 4, md: 16 } }}>
      <SectionTitle>Khách Hàng Nói Gì?</SectionTitle>
      <Box
        sx={{
          mt: 4,
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
        }}
      >
        {testimonials.map((t, i) => (
          <AvatarCard
            key={i}
            name={t.fullName}
            text={t.content}
            img={t.img}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Testimonials;
