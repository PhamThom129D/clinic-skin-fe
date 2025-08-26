import { Box} from "@mui/material";
import React from "react";

const Banner: React.FC = () => (
<Box
  sx={{
    minHeight: { xs: "70vh", sm: "90vh", md: "110vh" },
    backgroundImage: "url('https://thucucsaigon.vn/m/intro/Banner-web-1920x970tv.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    px: { xs: 2, sm: 4, md: 8 },
  }}
/>
);

export default Banner;
