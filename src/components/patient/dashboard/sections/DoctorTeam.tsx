import React from "react";
import { Typography, Box } from "@mui/material";

const doctors = [
  { name: "BS. Nguyễn Văn A", role: "Chuyên gia thẩm mỹ", img: "/images/doctor.png" },
  { name: "BS. Trần Thị B", role: "Chuyên gia da liễu", img: "/images/doctor.png" },
  { name: "BS. Lê Văn C", role: "Phẫu thuật thẩm mỹ", img: "/images/doctor.png" },
];

const DoctorTeamSimple: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 4,
      justifyContent: "center",
      px: { xs: 2, sm: 4, md: 8 },
      py: 8,
    }}
  >
    {doctors.map((doc, i) => (
      <Box
        key={i}
        sx={{
          textAlign: "center",
          maxWidth: { xs: "100%", sm: 250 },
          flex: { xs: "1 1 100%", sm: "1 1 250px" },
        }}
      >
        <Box
          component="img"
          src={doc.img}
          alt={doc.name}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 2,
            mb: 1,
          }}
        />
        <Typography variant="h6" sx={{ mt: 1 }}>
          {doc.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {doc.role}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default DoctorTeamSimple;
