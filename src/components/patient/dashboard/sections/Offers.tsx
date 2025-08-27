import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardHover from "../../../common/CardHover";
import axios from "axios";

// const offers = [
//   { title: "Giảm 50% Nâng mũi", desc: "Tạo dáng mũi chuẩn Hàn Quốc", img: "https://i.pinimg.com/736x/0e/cf/07/0ecf07040c7806a0b017331a5d75d661.jpg" },
//   { title: "Ưu đãi Cắt mí", desc: "Đôi mắt to tròn, tự nhiên", img: "https://i.pinimg.com/736x/5f/76/46/5f7646bf405c0f585b60bd97b0080162.jpg" },
//   { title: "Trị nám - trẻ hóa", desc: "Công nghệ Laser hiện đại", img: "https://i.pinimg.com/736x/07/cd/c1/07cdc13407209b16816d5ed4460f3874.jpg" },
// ];

interface Offer {
  title: string;
  desc: string;
  img: string;
}

const Offers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:1209/api/offers");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
  <Box sx={{ py: 8, px: { xs: 2, sm: 6, md: 16 } }}>
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Typography variant="h4" fontWeight="bold">Ưu Đãi Hot</Typography>
    </Box>

    <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" } }}>
      {offers.map((o, i) => (
        <CardHover key={i} image={o.img}>
          <Typography variant="h6" color="primary" sx={{ mb: 1, fontWeight: "bold" }}>{o.title}</Typography>
          <Typography variant="body2" color="text.secondary">{o.desc}</Typography>
        </CardHover>
      ))}
    </Box>
  </Box>
);
};

export default Offers;
