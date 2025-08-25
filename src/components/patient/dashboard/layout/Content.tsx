"use client"; // nếu các component con dùng hook

import React from "react";
import { Box } from "@mui/material";
import Offers from "../sections/Offers";
import Facilities from "../sections/Facilities";
import DoctorTeamSimple from "../sections/DoctorTeam";
import ContactBooking from "../sections/ContactBooking";
import WhyChooseUs from "../sections/WhyChooseUs";
import Testimonials from "../sections/Testimonials";


const Content: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url("https://res.cloudinary.com/dgmrwe4eo/image/upload/v1756106511/test_Bg_naaz2k.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
  );
};

export default Content;
