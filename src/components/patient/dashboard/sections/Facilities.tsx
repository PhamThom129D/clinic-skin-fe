import { Box } from "@mui/material";
import React from "react";

const Facilities: React.FC = () => (
  <Box 
    sx={{ 
      pt: 12,
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}
  >
    <img
      src="https://thammythucuc.vn/landing/thu-cuc-uu-dai/assets/images/img/bacsi.png"
      alt="Trang thiết bị"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  </Box>
);

export default Facilities;

