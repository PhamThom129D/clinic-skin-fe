"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";
import Offers from "../sections/Offers";
import Facilities from "../sections/Facilities";
import DoctorTeamSimple from "../sections/DoctorTeam";
import ContactBooking from "../sections/ContactBooking";
import WhyChooseUs from "../sections/WhyChooseUs";
import Testimonials from "../sections/Testimonials";

const Content: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url("https://res.cloudinary.com/dgmrwe4eo/image/upload/v1756106511/test_Bg_naaz2k.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        // Cách 1: filter trực tiếp
        // filter: isDark ? "brightness(0.35) saturate(1.2)" : "none",
      }}
    >
      {/* Cách 2: Overlay màu khi darkmode */}
      {isDark && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(40, 99, 57, 0.5)", // overlay xanh đậm
            pointerEvents: "none", // không che lớp con
          }}
        />
      )}

      {/* Nội dung */}
      <Box sx={{ position: "relative" }}>
        <Box id="offers">
          <Offers />
        </Box>

        <Box id="facilities">
          <Facilities />
        </Box>

        <Box id="doctor-team">
          <DoctorTeamSimple />
        </Box>

        <Box id="why-choose-us">
          <WhyChooseUs />
        </Box>

        <Box id="testimonials">
          <Testimonials />
        </Box>

        <Box id="contact-booking">
          <ContactBooking />
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
