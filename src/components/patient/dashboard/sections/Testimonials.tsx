import AvatarCard from "@/components/common/AvatarCard";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Testimonial } from "@/types/screen";
import { getTestimonials } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";

const Testimonials: React.FC = () => {
  const { data: testimonials, isLoading } = useFetchData<Testimonial[]>(getTestimonials);

  if (isLoading) {
    return <Typography sx={{ color: "#000" }}>Loading...</Typography>;
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 16 } }}>
      {/* Tiêu đề */}
      <Box textAlign="center">
        <Box
          component="h2"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 2,
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "2.5rem" },
            textAlign: "center",
            background: "linear-gradient(90deg, #158437, #52b788)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Khách Hàng Nói Gì?
        </Box>
      </Box>

      {/* Danh sách testimonial */}
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
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              transition: "all 0.35s ease",
              color: "#000",
              backgroundColor: "#fdfdfd", // nền sáng cố định
              border: "1px solid #d6f0e0",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 8px 24px rgba(21,132,55,0.15)",
                background: "linear-gradient(135deg, #e0f7f0, #ffffff)",
                borderColor: "#52b788",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Testimonials;
