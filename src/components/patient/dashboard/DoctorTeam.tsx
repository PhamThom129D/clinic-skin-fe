import { Box } from "@mui/material";
import React from "react";
import SectionTitle from "../../common/SectionTitle";
import AvatarCard from "../../common/AvatarCard";

const doctors = [
  { name: "BS. Nguyễn Văn A", role: "Chuyên gia thẩm mỹ", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { name: "BS. Trần Thị B", role: "Chuyên gia da liễu", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { name: "BS. Lê Văn C", role: "Phẫu thuật thẩm mỹ", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { name: "BS. Phạm Thị D", role: "Chăm sóc da", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { name: "BS. Phạm Thị D", role: "Chăm sóc da", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
  { name: "BS. Phạm Thị D", role: "Chăm sóc da", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" }
];

const DoctorTeam: React.FC = () => (
  <Box sx={{ py: 16 }}>
    <SectionTitle>Đội Ngũ Bác Sĩ</SectionTitle>
    <Box
      sx={{
        mt: 4,
        display: "grid",
        gap: 4,
        mx : "auto",
        px: { xs: 2, sm: 6, md: 12 },
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
      }}
    >
      {doctors.map((doc, i) => (
        <AvatarCard key={i} name={doc.name} role={doc.role} img={doc.img} />
      ))}
    </Box>
  </Box>
);

export default DoctorTeam;
