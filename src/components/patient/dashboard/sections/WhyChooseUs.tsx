import { Box, Typography } from "@mui/material";
import React, { JSX, useEffect, useState } from "react";
import { WorkspacePremium, MedicalServices, Favorite } from "@mui/icons-material";
import CardHover from "@/components/common/CardHover";
import axios from "axios";

// const reasons = [
//   { title: "Kinh nghiệm lâu năm", text: "Đội ngũ bác sĩ với nhiều năm kinh nghiệm.", icon: <WorkspacePremium sx={{ fontSize: 50, color: "#FFD700" }} /> },
//   { title: "Trang thiết bị hiện đại", text: "Ứng dụng công nghệ tiên tiến hàng đầu.", icon: <MedicalServices sx={{ fontSize: 50, color: "#4caf50" }} /> },
//   { title: "Dịch vụ tận tâm", text: "Chăm sóc khách hàng chu đáo, chuyên nghiệp.", icon: <Favorite sx={{ fontSize: 50, color: "#f06292" }} /> },
// ];

interface Reason {
  id: number
  title: string;
  content: string;
  img: string;
}

const WhyChooseUs: React.FC = () => {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await axios.get("http://localhost:1209/api/screen/reasons");
        setReasons(response.data);
      } catch (error) {
        console.error("Error fetching reasons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReasons();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
  <Box sx={{ py: 16, px: { xs: 2, sm: 4, md: 16 } }}>
    <Box sx={{ textAlign: "center", mb: 8, fontSize: "2rem", fontWeight: "bold" }}>Vì Sao Chọn Chúng Tôi?</Box>

    <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" } }}>
      {reasons.map((r, i) => (
        <CardHover key={i}>
          <Box sx={{ mb: 2 }}><img src={r.img} alt={r.title} style={{ width: "50px", height: "50px", borderRadius: "8px" }} /></Box>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>{r.title}</Typography>
          <Typography variant="body2" color="text.secondary">{r.content}</Typography>
        </CardHover>
      ))}
    </Box>
  </Box>
  );
};

export default WhyChooseUs;
